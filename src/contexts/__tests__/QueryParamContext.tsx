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
      "http://localhost/?photo=new-value&categories=bw",
    );
    const Component = withQueryParams(
      renderTestComponent({ photo: "new-value", category: "bw" }),
    );
    const { getByTestId } = render(<Component />);
    jest.spyOn(window.location, "href", "get");

    // act
    const photoBtn = getByTestId("photo-btn");
    const categoryBtn = getByTestId("category-btn");
    fireEvent.click(photoBtn);
    fireEvent.click(categoryBtn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?photo=new-value&categories=bw",
    );
  });

  it("sets the categories when toggleCategory is called", () => {
    // arrange
    const Component = withQueryParams(
      renderTestComponent({ category: "low-key" }),
    );
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("category-btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?categories=low-key",
    );
  });

  it("appends a category when another category is selected", () => {
    // arrange
    const Component = withQueryParams(
      renderTestComponent(
        { category: "low-key" },
        { category: "architecture" },
      ),
    );
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("category-btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?categories=architecture",
    );
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?categories=architecture%2Clow-key",
    );
  });

  it("removes the category when it's already selected", () => {
    // arrange
    const Component = withQueryParams(
      renderTestComponent({ category: "low-key" }, { category: "low-key" }),
    );
    const { getByTestId } = render(<Component />);

    // act
    const btn = getByTestId("category-btn");
    fireEvent.click(btn);

    // assert
    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      "",
      "?categories=low-key",
    );
    expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "http://localhost/");
  });

  function renderTestComponent(
    uriParams: Partial<{ photo: string; category: string }>,
    defaultParams: Partial<{ photo: string; category: string }> = {},
  ): React.FC {
    return () => {
      const queryParam = useQueryParams();

      useEffect(() => {
        if (defaultParams.category !== undefined) {
          queryParam.toggleCategory!(defaultParams.category);
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
            data-testid="category-btn"
            onClick={() => queryParam.toggleCategory!(uriParams.category!)}
          >
            Category
          </button>
        </>
      );
    };
  }
});
