import React, { useEffect, useState } from "react";
import PhotoViewer from "../components/PhotoViewer";
import Sidebar from "./Sidebar";
import { useQueryParams, withQueryParams } from "../contexts/QueryParamContext";
import { indexPhotos, Photo, PhotoWithSrc } from "../db";
import { Keyword } from "../types";
import Gallery from "./Gallery";
import SidebarOutset from "./SidebarOutset";

const Main: React.FC = () => {
  const { photos, indexedPhotos } = indexPhotos();
  const [loadedPhotos, setLoadedPhotos] = useState<PhotoWithSrc[]>([]);
  const queryParams = useQueryParams();

  useEffect(() => {
    loadGallery(photos).then((photos) => setLoadedPhotos(photos));
  }, []);

  /**
   * loadGallery loads the gallery photos from the images folder.
   * @param {Photo[]} photos - The photos to load.
   * @returns {Promise<PhotoWithSrc[]>} - The photos with the src property set.
   */
  async function loadGallery(photos: Photo[]) {
    const photoWithSrc = [];

    for (const photo of photos) {
      const src = (await import(`../images/${photo.name}.webp`)).default;

      photoWithSrc.push({ ...photo, src });
    }

    return photoWithSrc;
  }

  /**
   * onPhotoSelect sets the photo query parameter in the URL and updates the corresponding state.
   * @param photo - The photo to set in the URL.
   */
  function onPhotoSelect(photo: PhotoWithSrc) {
    queryParams.setPhoto!(photo.id);
  }

  /**
   * closePhotoViewer closes the photo viewer.
   * @param {string} photo - The photo to set in the URL.
   */
  function closePhotoViewer() {
    queryParams.setPhoto!("");
  }

  /**
   * keywordSelectHandler toggles the keyword query parameter in the URL and updates the corresponding state.
   * @param {Keyword} keyword - The keyword to toggle in the URL.
   */
  function keywordSelectHandler(keyword: Keyword) {
    queryParams.toggleKeyword!(keyword);
  }

  return (
    <React.StrictMode>
      <main className="flex flex-col lg:flex-row">
        <div className="flex-auto">
          <Gallery
            keywords={queryParams.keywords}
            photos={loadedPhotos}
            onPhotoSelect={onPhotoSelect}
          />
        </div>

        <SidebarOutset value={false}>
          <Sidebar keywordSelectedHandler={keywordSelectHandler} />
        </SidebarOutset>

        <PhotoViewer
          src={
            loadedPhotos.length > 0 && indexedPhotos.has(queryParams.photo)
              ? loadedPhotos[indexedPhotos.get(queryParams.photo)!].src
              : ""
          }
          isVisible={
            queryParams.photo !== "" && indexedPhotos.has(queryParams.photo)
          }
          closeHandler={closePhotoViewer}
        />
      </main>
    </React.StrictMode>
  );
};

export default withQueryParams(Main, {
  photo: "",
  keywords: ["black-and-white", "low-key"],
});
