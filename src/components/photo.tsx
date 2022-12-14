import * as React from "react";
import * as css from './photo.module.css';

interface PhotoProps {
  src: string;
}

const Photo: React.FC<PhotoProps> = ({ src }) => {
  return <img className={css.photo} src={src} alt="" />
};

export default Photo;
