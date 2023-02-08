import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Keyword } from "../../types";
import { useQueryParams, withQueryParams } from "../QueryParamContext";

describe("QueryParamContext", () => {
  const url = "http://localhost/";
  let historySpy: jest.SpyInstance;
  let locationHrefSpy: jest.SpyInstance;

  beforeEach(() => {
    const url = "http://localhost";
    Object.defineProperty(window, "location", {
      value: new URL(url),
      configurable: true,
    });
    locationHrefSpy = jest.spyOn(window.location, "href", "get");
    historySpy = jest.spyOn(history, "replaceState");
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
    expect(historySpy).toHaveBeenCalledWith(null, "", "?photo=new-value");
  });

  it("removes query param when no value is assigned", () => {
    // arrange
    const Component = withQueryParams(renderTestComponent({ photo: "" }));
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("photo-btn");
    fireEvent.click(btn);

    // assert
    expect(historySpy).toHaveBeenCalledWith(null, "", "http://localhost/");
  });

  it("appends multiple params when setURIParams is called", () => {
    // arrange
    locationHrefSpy
      .mockReturnValueOnce(url)
      .mockReturnValue(`${url}?photo=new-value`);
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
    expect(historySpy).toHaveBeenCalledWith(null, "", "?photo=new-value");
    expect(historySpy).toHaveBeenCalledWith(
      null,
      "",
      "?photo=new-value&keywords=color",
    );
  });

  it("sets the keywords when toggleKeyword is called", () => {
    // arrange
    locationHrefSpy.mockReturnValue(url);
    const Component = withQueryParams(
      renderTestComponent({ keyword: "low-key" }),
    );
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("keyword-btn");
    fireEvent.click(btn);

    // assert
    expect(historySpy).toHaveBeenCalledWith(null, "", "?keywords=low-key");
  });

  it("appends a keyword when another keyword is selected", () => {
    // arrange
    locationHrefSpy
      .mockReturnValueOnce(url)
      .mockReturnValue(`${url}?keywords=color`);
    const Component = withQueryParams(
      renderTestComponent({ keyword: "low-key" }),
      { photo: "", keywords: ["color"] },
    );
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("keyword-btn");
    fireEvent.click(btn);

    // assert
    expect(historySpy).toHaveBeenCalledWith(null, "", "?keywords=color");
    expect(historySpy).toHaveBeenCalledWith(
      null,
      "",
      "?keywords=color%2Clow-key",
    );
  });

  it("removes the keyword when it's already selected", () => {
    // arrange
    locationHrefSpy.mockReturnValue(url);
    const Component = withQueryParams(
      renderTestComponent({ keyword: "black-and-white" }),
      { photo: "", keywords: ["black-and-white"] },
    );
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("keyword-btn");
    fireEvent.click(btn);

    // assert
    expect(historySpy).toHaveBeenCalledWith(
      null,
      "",
      "?keywords=black-and-white",
    );
    expect(historySpy).toHaveBeenCalledWith(null, "", "http://localhost/");
  });

  it("retains the selected keywords when the page reloads", () => {
    // arrange
    locationHrefSpy.mockReturnValue(`${url}?keywords=color%2Clow-key`);
    const Component = withQueryParams(
      renderTestComponent({ keyword: "black-and-white" }),
      { photo: "", keywords: ["black-and-white"] },
    );
    render(<Component />);

    // assert
    expect(historySpy).toHaveBeenCalledWith(
      null,
      "",
      "?keywords=color%2Clow-key",
    );
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
