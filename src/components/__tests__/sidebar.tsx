import { fireEvent, render } from "@testing-library/react";
import React from "react";
import rendeder from "react-test-renderer";
import { SidebarOutsetContext } from "../../containers/SidebarOutset";
import Sidebar from "../Sidebar";

describe("Sidebar component", () => {
  const menuTestID = "menu";
  const mockHandler = jest.fn();

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
  });
});
