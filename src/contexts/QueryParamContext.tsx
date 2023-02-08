import React, { createContext, useContext, useEffect, useState } from "react";
import { Keyword } from "../types";
import { getURLSearchParams } from "./QueryParamContextHelper";

interface QueryParams {
  photo: string;
  keywords: Keyword[];
}

interface QueryParamsContextProps {
  photo: string;
  keywords: Keyword[];
  setPhoto?: (photo: string) => void;
  toggleKeyword?: (keyword: Keyword) => void;
}

const QueryParamContext = createContext<QueryParamsContextProps>({
  photo: "",
  keywords: [],
});

const useQueryParams = () => useContext(QueryParamContext);

type WithQueryParams = <T>(
  Component: React.FC<T>,
  defaults?: QueryParams,
) => React.FC<T & {}>;

const withQueryParams: WithQueryParams =
  (Component, defaults = { photo: "", keywords: [] }) => (props) => {
    const [queryParams, setQueryParams] = useState<QueryParams>({
      photo: defaults.photo,
      keywords: defaults.keywords,
    });

    useEffect(() => {
      const [, searchParams] = getURLSearchParams();
      const keywordsParam = searchParams.get("keywords");

      if (keywordsParam === null) {
        // setting the default keyword so that when the page loads,
        // only B&W images are displayed.
        setURLSearchParams(defaults.keywords);
      } else {
        const keywords = keywordsParam.split(",") as Keyword[];
        setQueryParams({ ...queryParams, keywords });
        setURLSearchParams(keywords);
      }
    }, []);

    /**
     * setPhoto sets the photo query parameter in the URL and updates the corresponding state.
     * @param {string} photo - The photo to set in the URL.
     */
    function setPhoto(photo: string) {
      const [uri, searchParams] = getURLSearchParams();

      if (photo === "") {
        searchParams.delete("photo");
      } else {
        searchParams.set("photo", photo);
      }

      setQueryParams({ ...queryParams, photo });
      replaceHistoryState(uri, searchParams);
    }

    /**
     * toggleKeyword toggles the selection state of a keyword in the URL and updates the corresponding state.
     * @param {Keyword} keyword - The keyword to toggle the selection state for.
     */
    function toggleKeyword(keyword: Keyword) {
      const keywords = [...queryParams.keywords];

      if (keywords.includes(keyword)) {
        const index = keywords.indexOf(keyword);
        keywords.splice(index, 1);
      } else {
        keywords.push(keyword);
      }

      setURLSearchParams(keywords);
      setQueryParams({ ...queryParams, keywords });
    }

    return (
      <>
        <QueryParamContext.Provider
          value={{
            photo: queryParams.photo,
            keywords: queryParams.keywords,
            setPhoto,
            toggleKeyword,
          }}
        >
          <Component {...props} />
        </QueryParamContext.Provider>
      </>
    );

    /**
     * setURLSearchParams sets the keywords query parameter in the URL based on the provided keywords.
     * @param {Keyword[]} keywords - The keywords to set in the URL.
     */
    function setURLSearchParams(keywords: Keyword[]) {
      const [uri, searchParams] = getURLSearchParams();

      if (keywords.length > 0) {
        searchParams.set("keywords", keywords.join(","));
      } else {
        searchParams.delete("keywords");
      }

      replaceHistoryState(uri, searchParams);
    }

    /**
     * replaceHistoryState replaces the current history state with a new URL based on the provided URI and search parameters.
     * @param {string} uri - The URI to use in the new URL.
     * @param {URLSearchParams} params - The search parameters to use in the new URL.
     */
    function replaceHistoryState(uri: string, params: URLSearchParams) {
      const hasQueryParams = Array.from(params.values()).length > 0;
      const url = hasQueryParams ? `?${params.toString()}` : uri;
      window.history.replaceState(null, "", url);
    }
  };

export { QueryParams, useQueryParams, withQueryParams };
