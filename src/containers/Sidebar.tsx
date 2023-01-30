import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { ChevronIcon } from "../components/Icons";
import { useQueryParams } from "../contexts/QueryParamContext";
import * as icon from "../images/icons/bmc-full-logo.svg";
import { Keyword, Menu } from "../types";
import { useSidebarOutset } from "./SidebarOutset";

interface KeywordTag {
  isSelected: boolean;
  key: Keyword;
  name: string;
}

interface Navigation {
  key: Menu;
  name: string;
}

interface SidebarProps {
  keywordSelectedHandler: (keyword: Keyword) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ keywordSelectedHandler }) => {
  const [keywords, setKeywords] = useState<KeywordTag[]>([
    { key: "architecture", name: "Architecture", isSelected: false },
    { key: "black-and-white", name: "Black and White", isSelected: false },
    { key: "color", name: "Color", isSelected: false },
    { key: "film-simulation", name: "Film Simulation", isSelected: false },
    { key: "low-key", name: "Low-Key", isSelected: false },
  ]);
  const queryParam = useQueryParams();
  const sidebarOutset = useSidebarOutset();
  const links: Navigation[] = [{ key: "about", name: "About" }];
  const cns = cn();

  useEffect(() => {
    const defaultKeywords = queryParam.keywords;

    if (defaultKeywords.length > 0) {
      setKeywords((outdatedKeywords) => {
        const updatedKeywords = outdatedKeywords.map((k) => {
          if (defaultKeywords.includes(k.key)) {
            return { ...k, isSelected: true };
          }

          return { ...k };
        });

        return updatedKeywords;
      });
    }
  }, []);

  function toggleSidebar() {
    sidebarOutset.setIsVisible!(!sidebarOutset.isVisible);
  }

  function toggleKeyword(keyword: KeywordTag) {
    setKeywords((outdatedKeywords) => {
      const updatedKeywords = outdatedKeywords.map((k) => ({ ...k }));
      const tag = updatedKeywords.find((k) => k.key === keyword.key)!;
      tag.isSelected = !tag.isSelected;

      return updatedKeywords;
    });

    keywordSelectedHandler(keyword.key as Keyword);
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
                {links.map(({ key, name }) => (
                  <li
                    className="cursor-pointer pl-8"
                    key={key}
                    data-testid={key}
                  >
                    {name}
                  </li>
                ))}

                <hr className="border-slate-700 my-3 mx-8" />

                {keywords.map((keyword) => (
                  <li
                    className={cns.keyword(keyword.isSelected)}
                    key={keyword.key}
                    data-testid={keyword.key}
                    onClick={() => toggleKeyword(keyword)}
                  >
                    {keyword.name}
                  </li>
                ))}
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
      "pl-8",
      "pt-14",
      "text-3xl",
    ),
    icon: (isVisible: boolean) =>
      classNames("h-6", "relative", { "rotate-180": isVisible }, "w-12"),
    keyword: (isSelected: boolean) =>
      classNames(
        { "bg-slate-900 px-2 text-slate-100": isSelected },
        "cursor-pointer",
        "mt-1",
        "mx-8",
        "select-none",
      ),
    sidebar: classNames("bg-white", "flex", "flex-col", "h-screen", "w-full"),
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
