import { Link } from "gatsby";
import React from "react";
import * as css from "./sidebar.module.css";

interface Navigation {
  id: number;
  name: string;
  link: string;
}

const navigation: Navigation[] = [
  { id: 1, name: "B & W", link: "/gallery/black-and-white" },
  { id: 2, name: "Color", link: "/gallery/color" },
  { id: 3, name: "Low-Key", link: "/gallery/low-key" },
  { id: 4, name: "Film Simulation", link: "/gallery/film-simulation" },
];

const Sidebar: React.FC = () => {
  return (
    <div className={css.sidebar}>
      <div className={css.stick}>
        <div className={css.brand}>Xenon Photography</div>

        <nav className={css.nav}>
          {navigation.map((nav) => (
            <div key={nav.id} className={css.nav__item}>
              <Link to={nav.link}>{nav.name}</Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
