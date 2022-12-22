import React from "react";
import * as css from "./photo-viewer.module.css";

interface PhotoViewerProps {
  isVisible: boolean;
  closeHandler: () => void;
  src: string;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({
  closeHandler,
  isVisible,
  src,
}) => {
  return (
    <>
      {isVisible && (
        <div className={css.photoViewer__background} onClick={() => closeHandler()}>
          <div className={css.photoViewer__wrapper}>
            <span className={css.photoViewer__close}>Close</span>
            <img className={css.photoViewer__img} src={src} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoViewer;
