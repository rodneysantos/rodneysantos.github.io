import * as React from "react";
import Header from "../../components/header";
import Gallery from "../../containers/gallery";

const ColorGallery: React.FC = () => {
  return (
    <main>
      <Header />
      <Gallery />
    </main>
  );
};

export default ColorGallery;
