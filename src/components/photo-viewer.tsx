import classNames from 'classnames';
import React, { memo } from "react";

interface PhotoViewerProps {
  isVisible: boolean;
  closeHandler: () => void;
  src: string;
}

const PhotoViewer: React.FC<PhotoViewerProps> = memo(({ closeHandler, isVisible, src, }) => {
  const cns = cn();

  return (
    <>
      {isVisible && (
        <div className={cns.background} onClick={() => closeHandler()} data-testid="photo-viewer">
          <div className={cns.container}>
            <span className={cns.close} data-testid="photo-viewer-close">Close</span>
            <img className={cns.img} src={src} alt="" data-testid="photo-viewer-img" />
          </div>
        </div>
      )}
    </>
  )
});

function cn() {
  return {
    background: classNames(
      'bg-white',
      'fixed',
      'h-full',
      'w-full',
    ),
    close: classNames(
      'absolute',
      'cursor-pointer',
      'right-c1',
      'text-slate-500',
      'top-c1',
    ),
    container: classNames(
      'flex',
      'flex-col',
      'h-full',
      'items-center',
      'justify-center',
      'p-c1',
    ),
    img: classNames(
      'max-h-full',
      'max-w-full',
    ),
  }
}

export default PhotoViewer;
