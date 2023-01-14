import React, { useEffect, useState } from "react";
import PhotoViewer from "../components/PhotoViewer";
import Sidebar from "../components/Sidebar";
import { useQueryParams, withQueryParams } from "../contexts/QueryParamContext";
import data, { PhotoAsset } from "../db";
import Gallery, { GalleryPhoto } from "./Gallery";
import SidebarOutset from "./SidebarOutset";

interface ModuleType {
  id: string;
  default: string;
}

const Main: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const queryParams = useQueryParams();

  useEffect(() => {
    loadGallery(data)
      .then((modules) => modules.map((m) => ({ id: m.id, src: m.default })))
      .then((photos) => setPhotos(photos));
  }, []);

  const loadGallery = async (photos: PhotoAsset[]) => {
    const modules: ModuleType[] = await Promise.all(
      photos.map(async (p) => ({
        id: p.id,
        ...(await import(`../images/${p.name}.webp`)),
      })),
    );

    return modules;
  };

  const onPhotoSelect = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo.src);
    queryParams.setURIParams!({ photo: photo.src });
  };

  const closePhotoViewer = () => {
    setSelectedPhoto("");
    queryParams.setURIParams!({ photo: "" });
  };

  return (
    <React.StrictMode>
      <main className="flex flex-col lg:flex-row">
        <div className="flex-auto">
          <Gallery photos={photos} onPhotoSelect={onPhotoSelect} />
        </div>

        <SidebarOutset value={false}>
          <Sidebar />
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
