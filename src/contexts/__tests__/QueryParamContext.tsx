import React, { useEffect } from "react";
import { fireEvent, render } from "@testing-library/react";
import { useQueryParams, withQueryParams } from "../QueryParamContext";

describe("QueryParamContext", () => {
  let replaceStateSpy: jest.SpyInstance;
  let locationHrefSpy: jest.SpyInstance;

  beforeEach(() => {
    const url = "http://localhost";
    Object.defineProperty(window, "location", {
      value: new URL(url),
      configurable: true,
    });
    locationHrefSpy = jest.spyOn(window.location, "href", "get");
    replaceStateSpy = jest.spyOn(history, "replaceState");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls the replaceState when setURIParams is called", () => {
    // arrange
    const Component = withQueryParams(
      renderTestComponent({ photo: "new-value" }),
    );
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("photo-btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "?photo=new-value");
  });

  it("removes query param when no value is assigned", () => {
    // arrange
    const Component = withQueryParams(renderTestComponent({ photo: "" }));
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("photo-btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "http://localhost/");
  });

  it("appends multiple params when setURIParams is called", () => {
    // arrange
    locationHrefSpy.mockReturnValueOnce(
      "http://localhost/?photo=new-value&keywords=bw",
    );
    const Component = withQueryParams(
      renderTestComponent({ photo: "new-value", keyword: "bw" }),
    );
    const { getByTestId } = render(<Component />);
    jest.spyOn(window.location, "href", "get");

    // act
    const photoBtn = getByTestId("photo-btn");
    const keywordBtn = getByTestId("keyword-btn");
    fireEvent.click(photoBtn);
    fireEvent.click(keywordBtn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?photo=new-value&keywords=bw",
    );
  });

  it("sets the keywords when toggleKeyword is called", () => {
    // arrange
    const Component = withQueryParams(
      renderTestComponent({ keyword: "low-key" }),
    );
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("keyword-btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "?keywords=low-key");
  });

  it("appends a keyword when another keyword is selected", () => {
    // arrange
    const Component = withQueryParams(
      renderTestComponent({ keyword: "low-key" }, { keyword: "architecture" }),
    );
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("keyword-btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?keywords=architecture",
    );
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?keywords=architecture%2Clow-key",
    );
  });

  it("removes the keyword when it's already selected", () => {
    // arrange
    const Component = withQueryParams(
      renderTestComponent({ keyword: "low-key" }, { keyword: "low-key" }),
    );
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("keyword-btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "?keywords=low-key");
    expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "http://localhost/");
  });

  function renderTestComponent(
    uriParams: Partial<{ photo: string; keyword: string }>,
    defaultParams: Partial<{ photo: string; keyword: string }> = {},
  ): React.FC {
    return () => {
      const queryParam = useQueryParams();

      useEffect(() => {
        if (defaultParams.keyword !== undefined) {
          queryParam.toggleKeyword!(defaultParams.keyword);
        }

        if (defaultParams.photo !== undefined) {
          queryParam.setPhoto!(defaultParams.photo);
        }
      }, []);

      return (
        <>
          <button
            data-testid="photo-btn"
            onClick={() => queryParam.setPhoto!(uriParams.photo!)}
          >
            Photo
          </button>

          <button
            data-testid="keyword-btn"
            onClick={() => queryParam.toggleKeyword!(uriParams.keyword!)}
          >
            Keyword
          </button>
        </>
      );
    };
  }
});
