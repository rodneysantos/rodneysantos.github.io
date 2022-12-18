import { render } from "@testing-library/react";
import React from "react";
import rendeder from "react-test-renderer";

import Sidebar from "../sidebar";

describe("Header", () => {
  it("renders correctly", () => {
    // act
    const tree = rendeder.create(<Sidebar />);

    // assert
    expect(tree).toMatchSnapshot();
  });

  it("displays correct brand name", () => {
    // arrange
    const brandName = "Xenon Photography";

    // act
    const { getByText } = render(<Sidebar />);

    // assert
    expect(getByText(brandName)).toBeDefined();
  });
});
