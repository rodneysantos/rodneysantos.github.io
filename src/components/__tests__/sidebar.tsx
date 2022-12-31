import { cleanup, render } from "@testing-library/react";
import React from "react";
import rendeder from "react-test-renderer";
import Sidebar from "../sidebar";

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
    const brandName = "XENON PHOTOGRAPHY";

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
    expect(menus.length).toEqual(2);
    expect(menus[0].children[0].textContent).toEqual("About");
    expect(menus[0].children[1].textContent).toEqual("Portfolio");
  });

  it("renders each item in the portfoliio menus array", () => {
    // act
    const { getAllByTestId } = render(<Sidebar />);
    const menus = getAllByTestId(menuTestID);

    // assert
    expect(menus[1].children.length).toEqual(7);
  });
});
