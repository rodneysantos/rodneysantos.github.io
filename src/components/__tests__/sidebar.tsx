import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import rendeder from "react-test-renderer";
import { SidebarOutsetContext } from "../../containers/SidebarOutset";
import Sidebar from "../Sidebar";

afterEach(cleanup);

describe("Sidebar component", () => {
  const menuTestID = "menu";

  it("renders correctly", () => {
    // act
    const tree = rendeder.create(<Sidebar />).toJSON();

    // assert
    expect(tree).toMatchSnapshot();
  });

  it("displays correct brand name", () => {
    // arrange
    const brandName = "CHRISTOPHER SANTOS";

    // act
    const { getByText } = render(<Sidebar />);

    // assert
    expect(getByText(brandName)).toBeDefined();
  });

  it("renders each item in the root menus array", () => {
    // act
    const { getAllByTestId } = render(<Sidebar />);
    const menus = getAllByTestId(menuTestID);

    // assert
    expect(menus.length).toEqual(1);
    expect(menus[0].children[0].textContent).toEqual("About");
    expect(menus[0].children[1].textContent).toEqual("Architecture");
  });

  it("toggles the sidebar when the brand icon is clicked", () => {
    // assemble
    const isVisible = false;
    const setIsVisible = jest.fn();

    // act
    const { getByTestId } = render(
      <SidebarOutsetContext.Provider value={{ isVisible, setIsVisible }}>
        <Sidebar />
      </SidebarOutsetContext.Provider>,
    );
    const brandIcon = getByTestId("chevron-icon");
    fireEvent.click(brandIcon);

    // assert
    expect(setIsVisible).toHaveBeenCalledWith(true);
  });
});
