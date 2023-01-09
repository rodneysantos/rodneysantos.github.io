import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import rendeder from "react-test-renderer";
import PhotoViewer from "../PhotoViewer";

afterEach(cleanup);

describe("PhotoViewer component", () => {
  const src = "https://example.com/image.jpg";

  it("renders correctly", () => {
    // act
    const tree = rendeder
      .create(
        <PhotoViewer isVisible={true} src={src} closeHandler={() => {}} />,
      )
      .toJSON();

    // assert
    expect(tree).toMatchSnapshot();
  });

  it("renders the component when isVisible is true", () => {
    // act
    const { getByTestId } = render(
      <PhotoViewer isVisible={true} src={src} closeHandler={() => {}} />,
    );
    const photoViewerElement = getByTestId("photo-viewer");

    // assert
    expect(photoViewerElement).toBeInTheDocument();
  });

  it("renders the correct image src", () => {
    // act
    const { getByTestId } = render(
      <PhotoViewer isVisible={true} src={src} closeHandler={() => {}} />,
    );
    const imgElement = getByTestId("photo-viewer-img");

    // assert
    expect(imgElement).toHaveAttribute("src", src);
  });

  it("calls the close handler when the close button is clicked", () => {
    // arrange
    const closeHandler = jest.fn();

    // act
    const { getByTestId } = render(
      <PhotoViewer isVisible={true} src={src} closeHandler={closeHandler} />,
    );
    const closeButton = getByTestId("photo-viewer-close");
    fireEvent.click(closeButton);

    // assert
    expect(closeHandler).toHaveBeenCalled();
  });
});
