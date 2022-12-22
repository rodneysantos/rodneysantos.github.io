import React from "react";
import * as css from "./gallery.module.css";

export interface GalleryPhoto {
  id: string;
  src: string;
}

interface GalleryProps {
  photos: GalleryPhoto[];
  onPhotoSelect: (src: GalleryPhoto) => void;
}

const Gallery: React.FC<GalleryProps> = ({ photos, onPhotoSelect }) => {
  return (
    <div className={css.gallery}>
      {photos.map((photo) => {
        return (
          <img
            key={photo.id}
            className={css.photo}
            src={photo.src}
            alt=""
            onClick={() => onPhotoSelect(photo)}
          />
        );
      })}
    </div>
  );
};

export default Gallery;
