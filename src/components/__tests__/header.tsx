import { render } from "@testing-library/react";
import React from "react";
import rendeder from "react-test-renderer";

import Header from "../header";

describe("Header", () => {
  it("renders correctly", () => {
    // act
    const tree = rendeder.create(<Header />);

    // assert
    expect(tree).toMatchSnapshot();
  });

  it("displays correct brand name", () => {
    // arrange
    const brandName = "Christopher Santos";

    // act
    const { getByText } = render(<Header />);

    // assert
    expect(getByText(brandName)).toBeDefined();
  });
});
