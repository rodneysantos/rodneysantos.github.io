import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
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
  const className = [css.gallery, "1024px:grid-rows-[repeat(auto-fill,_258px)]"];
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const target = `.${css.photo}`;
      addRippleAnimation(target, photos.length);
    }, root);

    return () => ctx.revert();
  }, [photos]);

  return (
    <div ref={root} className={className.join(' ')}>
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

function addRippleAnimation(target: string, totalTarget: number) {
  const columns = 3;
  const defaults: GSAPTweenVars = {
    stagger: {
      grid: [columns, Math.ceil(totalTarget / columns)],
      from: "center",
      amount: 0.2,
    },
  };
  const timeline = gsap.timeline({ defaults });
  timeline.to(target, { alpha: 1, scale: 0.95, duration: 0.1 });
  timeline.to(target, { scale: 1.05, duration: 0.3 });
  timeline.to(target, { scale: 1, duration: 0.5 });
}

export default Gallery;
