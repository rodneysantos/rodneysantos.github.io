import classNames from "classnames";
import React, { Children } from "react";
import { useSidebarOutset } from "../containers/SidebarOutset";
import * as icon from "../images/icons/bmc-full-logo.svg";
import { Keywords, Menu } from "../types";
import { ChevronIcon } from "./Icons";

interface Navigation {
  key: Keywords | Menu;
  name: string;
}

interface SidebarProps {
  keywordSelectedHandler: (keyword: Keywords) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ keywordSelectedHandler }) => {
  const sidebarOutset = useSidebarOutset();
  const cns = cn();
  const links: Navigation[] = [{ key: "about", name: "About" }];
  const keywords: Navigation[] = [
    { key: "architecture", name: "Architecture" },
    { key: "black-and-white", name: "Black and White" },
    { key: "color", name: "Color" },
    { key: "film-simulation", name: "Film Simulation" },
    { key: "low-key", name: "Low-Key" },
  ];

  const toggleSidebar = () => {
    sidebarOutset.setIsVisible!(!sidebarOutset.isVisible);
  };

  function toggleKeyword(keyword: Keywords) {
    keywordSelectedHandler(keyword);
  }

  return (
    <>
      <div className={cns.sidebar}>
        <div className={cns.brand}>
          <div className="leading-6">
            <span className="tracking-wider">RODNEY SANTOS</span>
            <br />
            <span className="font-dosis text-base tracking-[0.48rem]">
              PHOTOGRAPHY
            </span>
          </div>

          <ChevronIcon
            className={cns.icon(sidebarOutset.isVisible)}
            clickHandler={toggleSidebar}
          />
        </div>

        <div className='flex flex-row h-screen'>
          <div className="flex flex-1 flex-col h-full overflow-hidden">
            <div className="font-medium grow mt-5" data-testid="navigation">
              <ul className="leading-8 list-none" data-testid="menu">
                {Children.toArray(
                  links.map(({ key, name }) => (
                    <li className="cursor-pointer" key={key} data-testid={key}>
                      {name}
                    </li>
                  )),
                )}

                <hr className="border-slate-700 my-3 w-c21/24" />

                {Children.toArray(
                  keywords.map(({ key, name }) => (
                    <li
                      className="cursor-pointer"
                      key={key}
                      data-testid={key}
                      onClick={() => toggleKeyword(key as Keywords)}
                    >
                      {name}
                    </li>
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
