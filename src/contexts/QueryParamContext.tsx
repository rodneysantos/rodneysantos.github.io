import React, { createContext, useContext, useEffect, useState } from "react";
import { Keyword } from "../types";

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
      // setting the default keyword so that when the page loads,
      // only B&W images are displayed.
      setURLSearchParams(defaults.keywords);
    }, []);

    function setPhoto(photo: string) {
      const [uri, params] = window.location.href.split("?");
      const searchParams = new URLSearchParams(params);

      if (photo === "") {
        searchParams.delete("photo");
      } else {
        searchParams.set("photo", photo);
      }

      setQueryParams({ ...queryParams, photo });
      replaceHistoryState(uri, searchParams);
    }

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

    function setURLSearchParams(keywords: Keyword[]) {
      const [uri, params] = window.location.href.split("?");
      const searchParams = new URLSearchParams(params);

      if (keywords.length > 0) {
        searchParams.set("keywords", keywords.join(","));
      } else {
        searchParams.delete("keywords");
      }

      replaceHistoryState(uri, searchParams);
    }

    function replaceHistoryState(uri: string, params: URLSearchParams) {
      const hasQueryParams = Array.from(params.values()).length > 0;
      const url = hasQueryParams ? `?${params.toString()}` : uri;
      window.history.replaceState(null, "", url);
    }
  };

export { QueryParams, useQueryParams, withQueryParams };
