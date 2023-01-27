import React, { useEffect, useState } from "react";
import PhotoViewer from "../components/PhotoViewer";
import Sidebar from "../components/Sidebar";
import { useQueryParams, withQueryParams } from "../contexts/QueryParamContext";
import data, { PhotoAsset } from "../db";
import { Keyword } from "../types";
import Gallery, { GalleryPhoto } from "./Gallery";
import SidebarOutset from "./SidebarOutset";

interface PhotoModuleType {
  id: string;
  keywords: string[];
  default: string;
}

const Main: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const queryParams = useQueryParams();

  useEffect(() => {
    loadGallery(data)
      .then((modules) =>
        modules.map((m) => ({
          id: m.id,
          src: m.default,
          keywords: m.keywords as Keyword[],
        })),
      )
      .then((photos) => setPhotos(photos));
  }, []);

  const loadGallery = async (photos: PhotoAsset[]) => {
    const modules = Promise.all(
      photos.map(
        async (p) =>
          ({
            id: p.id,
            keywords: p.keywords,
            ...(await import(`../images/${p.name}.webp`)),
          }) as PhotoModuleType,
      ),
    );

    return modules;
  };

  const onPhotoSelect = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo.src);
    queryParams.setPhoto!(photo.id);
  };

  const closePhotoViewer = () => {
    setSelectedPhoto("");
    queryParams.setPhoto!("");
  };

  function keywordSelectHandler(keyword: Keyword) {
    queryParams.toggleKeyword!(keyword);
  }

  return (
    <React.StrictMode>
      <main className="flex flex-col lg:flex-row">
        <div className="flex-auto">
          <Gallery
            keywords={queryParams.keywords}
            photos={photos}
            onPhotoSelect={onPhotoSelect}
          />
        </div>

        <SidebarOutset value={false}>
          <Sidebar keywordSelectedHandler={keywordSelectHandler} />
        </SidebarOutset>

        <PhotoViewer
          src={selectedPhoto}
          isVisible={selectedPhoto !== ""}
          closeHandler={closePhotoViewer}
        />
      </main>
    </React.StrictMode>
  );
};

export default withQueryParams(Main);
