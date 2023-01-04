import React, { useEffect, useState } from "react";
import PhotoViewer from "../components/photo-viewer";
import Sidebar from "../components/sidebar";
import data, { PhotoAsset } from "../db";
import Gallery, { GalleryPhoto } from "./gallery";
import { useGallery, withGallery } from "./gallery.context";
import classNames from 'classnames';

interface ModuleType {
  id: string;
  default: string;
}

const Main: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const gallery = useGallery();
  const cns = cn();

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

  return (
    <main className={cns.main}>
      <Sidebar />
      <Gallery photos={photos} onPhotoSelect={onPhotoSelect} />

      <PhotoViewer
        src={gallery.selectedPhoto}
        isVisible={gallery.selectedPhoto !== ""}
        closeHandler={closePhotoViewer}
      />
    </main>
  );
};

function cn() {
  return {
    main: classNames(
      '320px-425px:flex-col',
      'flex',
      'flex-row',
      'min-[360px]:max-[1023px]:flex-col',
    ),
  };
}

export default withGallery(Main);
