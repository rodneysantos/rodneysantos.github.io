import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface GalleryPhoto {
  id: string;
  src: string;
}

interface GalleryProps {
  photos: GalleryPhoto[];
  onPhotoSelect: (src: GalleryPhoto) => void;
}

const Gallery: React.FC<GalleryProps> = ({ photos, onPhotoSelect }) => {
  const root = useRef(null);
  const cns = cn();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const target = '.photo';
      addRippleAnimation(target, photos.length);
    }, root);

    return () => ctx.revert();
  }, [photos]);

  return (
    <div ref={root} className={cns.gallery}>
      {photos.map((photo) => {
        return (
          <img
            key={photo.id}
            className={cns.photo}
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

function cn() {
  return {
    gallery: classNames(
      'auto-rows-[minmax(min-content,_max-content)]',
      'gap-12',
      'grid',
      'grid-col',
      'p-12',

      'sm:grid-cols-2',

      'lg:grid-cols-3',

      '2xl:gap-14',
      '2xl:p-14',

      '3xl:gap-16',
      '3xl:p-16',

      '4xl:gap-24',
      '4xl:p-24',
    ),
    photo: classNames(
      'aspect-square',
      'h-full',
      'object-cover',
      'opacity-0',
      'photo',
      'w-full',
    )
  };
}

export default Gallery;
