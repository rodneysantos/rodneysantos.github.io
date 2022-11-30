import { Link } from "gatsby";
import * as React from "react";

const Header: React.FC = () => {
  return (
    <header className="grid grid-cols-2 p-8">
      <div className="brand">Christopher Santos</div>

      <nav className="flex">
        <div className="gallery flex-1">
          <Link to="/gallery/black-and-white">B&W</Link>
        </div>

        <div className="gallery flex-1">
          <Link to="/gallery/color">Color</Link>
        </div>

        <div className="gallery flex-1">
          <Link to="/gallery/low-key">Low-Key</Link>
        </div>

        <div className="gallery flex-1">
          <Link to="/gallery/film-simulation">Film Simulation</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
