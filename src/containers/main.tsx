import React, { useEffect, useState } from "react";
import PhotoViewer from "../components/photo-viewer";
import Sidebar from "../components/sidebar";
import data, { PhotoAsset } from "../db";
import Gallery, { GalleryPhoto } from "./gallery";
import { useGallery, withGallery } from "./gallery.context";
import SidebarOutset from "./SidebarOutset";

interface ModuleType {
  id: string;
  default: string;
}

const Main: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const gallery = useGallery();

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
    gallery.setSelectedPhoto(photo.src);
  };

  const closePhotoViewer = () => {
    gallery.setSelectedPhoto("");
  };

  return <React.StrictMode>
    <main className="flex flex-col lg:flex-row">
      <div className="flex-auto">
        <Gallery photos={photos} onPhotoSelect={onPhotoSelect} />
      </div>

      <SidebarOutset value={false}>
        <Sidebar />
      </SidebarOutset>

      <PhotoViewer
        src={gallery.selectedPhoto}
        isVisible={gallery.selectedPhoto !== ""}
        closeHandler={closePhotoViewer}
      />
    </main>
  </React.StrictMode>
};

export default withGallery(Main);
