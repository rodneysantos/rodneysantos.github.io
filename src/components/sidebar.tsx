import { Link } from "gatsby";
import React from "react";
import * as css from './sidebar.module.css';

interface Navigation {
  name: string;
  link: string;
}

const navigation: Navigation[] = [
  { name: 'B & W', link: '/gallery/black-and-white' },
  { name: 'Color', link: '/gallery/color' },
  { name: 'Low-Key', link: '/gallery/low-key' },
  { name: 'Film Simulation', link: '/gallery/film-simulation' },
];

const Sidebar: React.FC = () => {
  return (
    <div className={css.sidebar}>
      <div className={css.stick}>
        <div className={css.brand}>Xenon Photography</div>

        <nav className={css.nav}>
          {navigation.map(nav => <div className={css.nav__item}>
            <Link to={nav.link}>{nav.name}</Link>
          </div>)}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
