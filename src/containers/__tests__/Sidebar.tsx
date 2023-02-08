import { fireEvent, render } from "@testing-library/react";
import React from "react";
import rendeder from "react-test-renderer";
import { SidebarOutsetContext } from "../SidebarOutset";
import Sidebar from "../Sidebar";
import { withQueryParams } from "../../contexts/QueryParamContext";

describe("Sidebar component", () => {
  const menuTestID = "menu";
  const mockHandler = jest.fn();
  const url = "http://localhost/";
  let locationHrefSpy: jest.SpyInstance;

  beforeEach(() => {
    const url = "http://localhost";
    Object.defineProperty(window, "location", {
      value: new URL(url),
      configurable: true,
    });
    locationHrefSpy = jest.spyOn(window.location, "href", "get");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    // arrange
    const tree = rendeder
      .create(<Sidebar keywordSelectedHandler={mockHandler} />)
      .toJSON();

    // assert
    expect(tree).toMatchSnapshot();
  });

  it("displays correct brand name", () => {
    // arrange
    const brandName = "RODNEY SANTOS";
    const { getByText } = render(
      <Sidebar keywordSelectedHandler={mockHandler} />,
    );

    // assert
    expect(getByText(brandName)).toBeDefined();
  });

  it("renders each item in the root menus array", () => {
    // arrange
    const { getAllByTestId } = render(
      <Sidebar keywordSelectedHandler={mockHandler} />,
    );

    // act
    const menus = getAllByTestId(menuTestID);

    // assert
    expect(menus.length).toEqual(1);
    expect(menus[0].children[0].textContent).toEqual("About");
    expect(menus[0].children[2].textContent).toEqual("Architecture");
  });

  it("toggles the sidebar when the brand icon is clicked", () => {
    // arrange
    const isVisible = false;
    const setIsVisible = jest.fn();
    const { getByTestId } = render(
      <SidebarOutsetContext.Provider value={{ isVisible, setIsVisible }}>
        <Sidebar keywordSelectedHandler={mockHandler} />
      </SidebarOutsetContext.Provider>,
    );

    // act
    const brandIcon = getByTestId("chevron-icon");
    fireEvent.click(brandIcon);

    // assert
    expect(setIsVisible).toHaveBeenCalledWith(true);
  });

  it("toggles a keyword when clicked", () => {
    // arrange
    const { getByTestId } = render(
      <Sidebar keywordSelectedHandler={mockHandler} />,
    );

    // act
    const colorKeyword = getByTestId("color");
    fireEvent.click(colorKeyword);

    // assert
    expect(mockHandler).toHaveBeenCalledWith("color");
    expect(colorKeyword.className).toContain("bg-slate-900");
  });

  it("highlights default keywords when provided", () => {
    // arrange
    const Component = withQueryParams(
      () => <Sidebar keywordSelectedHandler={mockHandler} />,
      { photo: "", keywords: ["color"] },
    );
    const { getByTestId } = render(<Component />);

    // act
    const colorKeyword = getByTestId("color");

    // assert
    expect(colorKeyword.className).toContain("bg-slate-900");
  });

  it("highlights the keywords that are not in the default list when provided", () => {
    // arrange
    locationHrefSpy.mockReturnValue(`${url}/?keywords=architecture%2Ccolor`);
    const Component = withQueryParams(
      () => <Sidebar keywordSelectedHandler={mockHandler} />,
      { photo: "", keywords: ["color"] },
    );
    const { getByTestId } = render(<Component />);

    // act
    const architectureKeyword = getByTestId("architecture");

    // assert
    expect(architectureKeyword.className).toContain("bg-slate-900");
  });
});
