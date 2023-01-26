import React, { createContext, useContext, useState } from "react";

interface QueryParams {
  photo: string;
  categories: string[];
}

interface QueryParamsContextProps {
  photo: string;
  categories: string[];
  setPhoto?: (photo: string) => void;
  toggleCategory?: (category: string) => void;
}

const QueryParamContext = createContext<QueryParamsContextProps>({
  photo: "",
  categories: [],
});

const useQueryParams = () => useContext(QueryParamContext);

type WithQueryParams = <T>(Component: React.FC<T>) => React.FC<T & {}>;

const withQueryParams: WithQueryParams = (Component) => (props) => {
  const [queryParams, setQueryParams] = useState<QueryParams>({
    photo: "",
    categories: [],
  });

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

  function toggleCategory(category: string) {
    const [uri, params] = window.location.href.split("?");
    const searchParams = new URLSearchParams(params);
    const categories = [...queryParams.categories];

    if (categories.includes(category)) {
      const index = categories.indexOf(category);
      categories.splice(index, 1);
    } else {
      categories.push(category);
    }

    if (categories.length > 0) {
      searchParams.set("categories", categories.join(","));
    } else {
      searchParams.delete("categories");
    }

    setQueryParams({ ...queryParams, categories });
    replaceHistoryState(uri, searchParams);
  }

  return (
    <>
      <QueryParamContext.Provider
        value={{ photo: "", categories: [], setPhoto, toggleCategory }}
      >
        <Component {...props} />
      </QueryParamContext.Provider>
    </>
  );

  function replaceHistoryState(uri: string, params: URLSearchParams) {
    const hasQueryParams = Array.from(params.values()).length > 0;
    const url = hasQueryParams ? `?${params.toString()}` : uri;
    window.history.replaceState(null, "", url);
  }
};

export { QueryParams, useQueryParams, withQueryParams };
