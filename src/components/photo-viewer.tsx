import React, { memo } from "react";
import * as css from "./photo-viewer.module.css";

interface PhotoViewerProps {
  isVisible: boolean;
  closeHandler: () => void;
  src: string;
}

const PhotoViewer: React.FC<PhotoViewerProps> = memo(({ closeHandler, isVisible, src, }) => {
  return (
    <>
      {isVisible && (
        <div className={css.photoViewer__background} onClick={() => closeHandler()} data-testid="photo-viewer">
          <div className={css.photoViewer__wrapper}>
            <span className={css.photoViewer__close} data-testid="photo-viewer-close">Close</span>
            <img className={css.photoViewer__img} src={src} alt="" data-testid="photo-viewer-img" />
          </div>
        </div>
      )}
    </>
  )
});

export default PhotoViewer;
