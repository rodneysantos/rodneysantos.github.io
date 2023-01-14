import React, { createContext, useContext, useState } from "react";

interface QueryParams {
  photo: string;
  categories: string;
}

interface QueryParamsContextProps {
  queryParams: QueryParams;
  setURIParams?: (values: Partial<QueryParams>) => void;
}

const QueryParamContext = createContext<QueryParamsContextProps>({
  queryParams: { photo: "", categories: "" },
});

const useQueryParams = () => useContext(QueryParamContext);

type WithQueryParams = <T>(Component: React.FC<T>) => React.FC<T & {}>;

const withQueryParams: WithQueryParams = (Component) => (props) => {
  const [queryParams, setQueryParams] = useState<QueryParams>({
    photo: "",
    categories: "",
  });

  function setURIParams(values: Partial<QueryParams>) {
    const [uri, params] = window.location.href.split("?");
    const searchParams = new URLSearchParams(params);

    for (const key of Object.keys(values)) {
      const value = values[key as keyof QueryParams] as string;

      if (value === "") {
        searchParams.delete(key);
        continue;
      }

      searchParams.set(key, value);
    }

    const hasQueryParams = Array.from(searchParams.values()).length > 0;
    window.history.replaceState(
      null,
      "",
      hasQueryParams ? `?${searchParams.toString()}` : uri,
    );
    setQueryParams({ ...queryParams, ...values });
  }

  return (
    <>
      <QueryParamContext.Provider value={{ queryParams, setURIParams }}>
        <Component {...props} />
      </QueryParamContext.Provider>
    </>
  );
};

export { QueryParams, useQueryParams, withQueryParams };
