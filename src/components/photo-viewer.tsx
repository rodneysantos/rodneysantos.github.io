import React from "react";
import * as css from "./photo-viewer.module.css";

interface PhotoViewerProps {
  src: string;
  isVisible: boolean;
}

const PhotoViewer: React.FC<PhotoViewerProps> = ({ isVisible, src }) => {
  return (
    <>
      {isVisible && (
        <div className={css.background}>
          <div className={css.wrapper}>
            <img src={src} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoViewer;
