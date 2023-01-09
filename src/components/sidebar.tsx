import classNames from "classnames";
import React, { Children } from "react";
import { useSidebarOutset } from "../containers/SidebarOutset";
import * as icon from "../images/icons/bmc-full-logo.svg";
import { ChevronIcon } from "./Icons";

interface Navigation {
  key: string;
  name: string;
}

const Sidebar: React.FC = () => {
  const sidebarOutset = useSidebarOutset();
  const cns = cn();
  const menus: Navigation[] = [
    { key: "about", name: "About" },
    { key: "architecture", name: "Architecture" },
    { key: "blackAndWhite", name: "Black and White" },
    { key: "color", name: "Color" },
    { key: "filmSimulation", name: "Film Simulation" },
    { key: "gasStation", name: "Gas Station" },
    { key: "lowKey", name: "Low-Key" },
    { key: "uncategorized", name: "Uncategorized" },
  ];

  const toggleSidebar = () => {
    sidebarOutset.setIsVisible(!sidebarOutset.isVisible);
  };

  return (
    <>
      <div className={cns.sidebar}>
        <div className={cns.brand}>
          CHRISTOPHER SANTOS
          <ChevronIcon
            className={cns.icon(sidebarOutset.isVisible)}
            clickHandler={toggleSidebar}
          />
        </div>

        <div className='flex flex-row h-screen'>
          <div className="flex flex-1 flex-col h-full overflow-hidden">
            <div className="font-normal grow mt-5" data-testid="navigation">
              <ul className="leading-8 list-none" data-testid="menu">
                {Children.toArray(
                  menus.map(({ key, name }) => (
                    <>
                      <li
                        className="cursor-pointer"
                        key={key}
                        data-testid={key}
                      >
                        {name}
                      </li>
                    </>
                  )),
                )}
              </ul>
            </div>

            <a
              className={cns.support}
              href="https://www.buymeacoffee.com/xenon.photo"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-32"
                src={icon.default}
                alt="Buy me a coffee icon"
              />

              <span className="mt-1 text-center text-xs">
                © {new Date().getFullYear()}
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

function cn() {
  return {
    brand: classNames(
      "flex",
      "flex-row",
      "font-big-shoulder",
      "font-bold",
      "items-center",
      "pt-12",
      "text-3xl",
    ),
    icon: (isVisible: boolean) =>
      classNames("h-6", "relative", { "rotate-180": isVisible }, "w-12"),
    sidebar: classNames(
      "bg-white",
      "flex",
      "flex-col",
      "pl-8",
      "h-screen",
      "w-full",
    ),
    support: classNames(
      "content-center",
      "flex",
      "flex-col",
      "flex-wrap",
      "pb-12",
      "pr-8",
      "w-full",
    ),
  };
}

export default Sidebar;
