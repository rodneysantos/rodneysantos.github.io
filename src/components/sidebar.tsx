import React, { Children } from "react";
import * as css from "./sidebar.module.css";

interface Navigation {
  key: string;
  name: string;
  menus?: Navigation[];
}

const menus: Navigation[] = [
  {
    key: "about",
    name: "About",
  },
  {
    key: "portfolio",
    name: "Portfolio",
    menus: [
      { key: "architecture", name: "Architecture" },
      { key: "blackAndWhite", name: "Black and White" },
      { key: "color", name: "Color" },
      { key: "filmSimulation", name: "Film Simulation" },
      { key: "gasStation", name: "Gas Station" },
      { key: "lowKey", name: "Low-Key" },
      { key: "uncategorized", name: "Uncategorized" },
    ],
  },
];

const Sidebar: React.FC = () => {
  const listBuilder = (menus: Navigation[]) => (
    <>
      <ul className={css.navigation} data-testid="menu">
        {Children.toArray(
          menus.map(({ key, name, menus }) => (
            <>
              <li key={key} data-testid={key}>
                {name}
              </li>

              {menus !== undefined && (
                <div data-testid="sub-menu">{listBuilder(menus)}</div>
              )}
            </>
          )),
        )}
      </ul>
    </>
  );

  return (
    <>
      <div className={css.sidebar}>
        <div className={css.stick}>
          <div className={css.brand} data-testid="brand">
            XENON PHOTOGRAPHY
          </div>

          <div className={css.navigation__wrapper} data-testid="navigation">
            {listBuilder(menus)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
