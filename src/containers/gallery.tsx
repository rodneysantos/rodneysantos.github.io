import React, { useEffect, useState } from "react";
import Photo from "../components/photo";
import gallery, { GalleryPhoto } from "../db";
import * as css from "./gallery.module.css";

interface ModuleType {
  default: string;
}

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    loadGallery(gallery)
      .then(modules => modules.map(m => m.default))
      .then(photos => setPhotos(photos));
  });

  const loadGallery = (photos: GalleryPhoto[]): Promise<ModuleType[]> => {
    return Promise.all(photos.map(p => import(`../images/${p.name}.webp`)));
  }

  return <article className={css.wrapper}>
    <div className={css.gallery}>
      {photos.map(photo => {
        return <Photo src={photo} />
      })}
    </div>
  </article>
};



export default Gallery;
