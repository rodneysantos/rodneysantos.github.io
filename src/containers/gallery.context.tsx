import React, { createContext, useContext, useState } from "react";

interface GalleryContextProps {
  selectedPhoto: string;
  setSelectedPhoto: (photo: string) => void;
}

type WithGallery = <T>(Component: React.FC<T>) => React.FC<T & {}>;

const GalleryContext = createContext<GalleryContextProps>({
  selectedPhoto: "",
  setSelectedPhoto: () => {},
});
const useGallery = () => useContext(GalleryContext);
const withGallery: WithGallery = (Component) => (props) => {
  const [selectedPhoto, setSelectedPhoto] = useState("");

  return (
    <GalleryContext.Provider value={{ selectedPhoto, setSelectedPhoto }}>
      <Component {...props} />
    </GalleryContext.Provider>
  );
};

export { useGallery, withGallery };
