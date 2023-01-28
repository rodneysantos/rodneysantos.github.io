import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Keyword } from "../../types";
import { useQueryParams, withQueryParams } from "../QueryParamContext";

describe("QueryParamContext", () => {
  const url = "http://localhost/";
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
    locationHrefSpy
      .mockReturnValueOnce(url)
      .mockReturnValueOnce(`${url}?keywords=black-and-white`)
      .mockReturnValue(`${url}?keywords=black-and-white&photo=new-value`);
    const Component = withQueryParams(
      renderTestComponent({ photo: "new-value", keyword: "color" }),
    );
    const { getByTestId } = render(<Component />);

    // act
    const photoBtn = getByTestId("photo-btn");
    const keywordBtn = getByTestId("keyword-btn");
    fireEvent.click(photoBtn);
    fireEvent.click(keywordBtn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?keywords=black-and-white",
    );
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?keywords=black-and-white&photo=new-value",
    );
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?keywords=black-and-white%2Ccolor&photo=new-value",
    );
  });

  it("sets the keywords when toggleKeyword is called", () => {
    // arrange
    locationHrefSpy
      .mockReturnValueOnce(url)
      .mockReturnValueOnce(`${url}?keywords=black-and-white`);
    const Component = withQueryParams(
      renderTestComponent({ keyword: "low-key" }),
    );
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("keyword-btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?keywords=black-and-white%2Clow-key",
    );
  });

  it("appends a keyword when another keyword is selected", () => {
    // arrange
    locationHrefSpy
      .mockReturnValueOnce(url)
      .mockReturnValueOnce(`${url}?keywords=black-and-white`);
    const Component = withQueryParams(
      renderTestComponent({ keyword: "low-key" }),
    );
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("keyword-btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?keywords=black-and-white",
    );
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?keywords=black-and-white%2Clow-key",
    );
  });

  it("removes the keyword when it's already selected", () => {
    // arrange
    locationHrefSpy
      .mockReturnValueOnce(url)
      .mockReturnValueOnce(`${url}?keywords=black-and-white`);
    const Component = withQueryParams(
      renderTestComponent({ keyword: "black-and-white" }),
    );
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("keyword-btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?keywords=black-and-white",
    );
    expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "http://localhost/");
  });

  function renderTestComponent(
    uriParams: Partial<{ photo: string; keyword: Keyword }>,
  ): React.FC {
    return () => {
      const queryParam = useQueryParams();

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
