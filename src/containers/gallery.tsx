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
      '1024px:gap-10',
      '2560px:gap-20',
      'auto-rows-[minmax(min-content,_max-content)]',
      'gap-12',
      'grid',
      'grid-cols-3',
      'min-[360px]:max-[1023px]:grid-cols-2',
      'min-[1280px]:max-[1919px]:gap-[3.25rem]',
      'min-[1440px]:max-[1920px]:gap-16',
      'py-12',
      'pr-12',
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
