import classNames from "classnames";
import React, { memo } from "react";

interface PhotoViewerProps {
  isVisible: boolean;
  closeHandler: () => void;
  src: string;
}

const PhotoViewer: React.FC<PhotoViewerProps> = memo(
  ({ closeHandler, isVisible, src }) => {
    const cns = cn();

    return (
      <>
        <div
          className={cns.background(isVisible)}
          onClick={() => closeHandler()}
          data-testid="photo-viewer"
        >
          <div className={cns.container}>
            <span className={cns.close} data-testid="photo-viewer-close">
              Close
            </span>
            <img
              className="max-h-full max-w-full pointer-events-none"
              src={src}
              alt=""
              data-testid="photo-viewer-img"
            />
          </div>
        </div>
      </>
    );
  },
);

function cn() {
  return {
    background: (isVisible: boolean) =>
      classNames(
        "bg-white",
        "duration-500",
        "fixed",
        "h-full",
        { "opacity-0": !isVisible },
        { "pointer-events-none": !isVisible },
        { "scale-75": !isVisible },
        { "scale-100": isVisible },
        "transition-all",
        "w-full",
        "will-change-auto",
      ),
    close: classNames(
      "absolute",
      "cursor-pointer",
      "right-c1",
      "text-slate-500",
      "top-c1",
    ),
    container: classNames(
      "flex",
      "flex-col",
      "h-full",
      "items-center",
      "justify-center",
      "p-4",
    ),
  };
}

export default PhotoViewer;
