import React from "react";
import * as css from "./gallery.module.css";

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {

  return (
    <div className={css.gallery}>
      {images.map((img) => {
        return <img className={css.photo} src={img} alt="" />;
      })}
    </div>
  );
};

export default Gallery;
