import classNames from 'classnames';
import React, { Children } from "react";
import * as icon from "../images/icons/bmc-full-logo.svg";

interface Navigation {
  key: string;
  name: string;
  menus?: Navigation[];
}

const Sidebar: React.FC = () => {
  const cns = cn();
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

  const listBuilder = (menus: Navigation[]) => (
    <>
      <ul className={cns.nav} data-testid="menu">
        {Children.toArray(
          menus.map(({ key, name, menus }) => (
            <>
              <li className={cns.menu} key={key} data-testid={key}>
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
      <div className={cns.sidebar}>
        <div className={cns.stick}>
          <div className={cns.brand} data-testid="brand">
            XENON PHOTOGRAPHY
          </div>

          <div className={cns.navContainer} data-testid="navigation">
            {listBuilder(menus)}
          </div>

          <a
            className={cns.support}
            href="https://www.buymeacoffee.com/xenon.photo"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={cns.buyMeACoffee}
              src={icon.default}
              alt="Buy me a coffee icon"
            />

            <span className={cns.copyright}>
              © {new Date().getFullYear()}
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

function cn() {
  return {
    brand: classNames(
      'font-bold',
      'pb-c1',
      'px-c1',
      'pt-c2',
      'text-lg',
      'tracking-wider',
    ),
    buyMeACoffee: classNames(
      'w-1/2',
    ),
    copyright: classNames(
      'mt-1',
      'text-center',
      'text-xs',
    ),
    menu: classNames(
      'cursor-pointer',
    ),
    nav: classNames(
      'leading-10',
      'list-none',
      '[&_ul]:px-5',
    ),
    navContainer: classNames(
      'font-normal',
      'grow',
      'px-c1',
    ),
    sidebar: classNames(
      'h-auto',
      'w-80',
    ),
    stick: classNames(
      'flex',
      'flex-col',
      'h-screen',
      'sticky',
      'top-0',
    ),
    support: classNames(
      'content-center',
      'flex',
      'flex-col',
      'flex-wrap',
      'pb-c1',
    ),
  };
}

export default Sidebar;
