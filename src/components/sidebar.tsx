import React, { Children } from "react";
import * as css from "./sidebar.module.css";
import * as icon from "../images/icons/bmc-full-logo.svg";

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
              <li className={css.menu} key={key} data-testid={key}>
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

          <a
            className={css.support}
            href="https://www.buymeacoffee.com/xenon.photo"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={css.support__buymeacoffee}
              src={icon.default}
              alt="Buy me a coffee icon"
            />

            <span className={css.support__copyright}>© {new Date().getFullYear()}</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
