import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import Gallery from './gallery';
import * as css from './main.module.css';
import gallery, { GalleryPhoto } from "../db";

interface ModuleType {
  default: string;
}

const Main: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    loadGallery(gallery)
      .then((modules) => modules.map((m) => m.default))
      .then((photos) => setPhotos(photos));
  });

  const loadGallery = (photos: GalleryPhoto[]): Promise<ModuleType[]> => {
    return Promise.all(photos.map((p) => import(`../images/${p.name}.webp`)));
  };

  return <main className={css.main}>
    <Sidebar />
    <Gallery images={photos} />
  </main>
};

export default Main;
