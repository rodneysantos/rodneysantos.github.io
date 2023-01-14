import React, { useEffect } from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import {
  QueryParams,
  useQueryParams,
  withQueryParams,
} from "../QueryParamContext";

afterEach(cleanup);

describe("QueryParamContext", () => {
  let replaceStateSpy: jest.SpyInstance;

  beforeEach(() => {
    replaceStateSpy = jest.spyOn(globalThis.history, "replaceState");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("calls the replaceState when setURIParams is called", () => {
    // assemble
    const Component = withQueryParams(
      renderTestComponent({ photo: "new-value" }),
    );

    // act
    const { getByTestId } = render(<Component />);
    const btn = getByTestId("btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "?photo=test");
    expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "?photo=new-value");
  });

  it("appends multiple params when setURIParams is called", () => {
    // assemble
    const Component = withQueryParams(
      renderTestComponent({
        photo: "new-value",
        categories: "bw,lowkey",
      }),
    );

    // act
    const { getByTestId } = render(<Component />);
    const btn = getByTestId("btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?photo=new-value&categories=bw%2Clowkey",
    );
  });

  it("removes query param when no value is assigned", () => {
    // assemble
    const Component = withQueryParams(renderTestComponent({ photo: "" }));

    // act
    const { getByTestId } = render(<Component />);
    const btn = getByTestId("btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "http://localhost/");
  });

  function renderTestComponent(uriParams: Partial<QueryParams>): React.FC {
    return () => {
      const queryParam = useQueryParams();

      useEffect(() => {
        queryParam.setURIParams!({ photo: "test" });
      }, []);

      return (
        <>
          <button
            data-testid="btn"
            onClick={() => queryParam.setURIParams!(uriParams)}
          >
            test
          </button>
        </>
      );
    };
  }
});
