import { cleanup, render } from "@testing-library/react";
import React from "react";
import rendeder from "react-test-renderer";
import Sidebar from "../sidebar";

afterEach(cleanup);

describe("Sidebar component", () => {
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
});
