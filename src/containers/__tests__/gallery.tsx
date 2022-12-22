import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import rendeder from "react-test-renderer";
import Gallery from "../gallery";

afterEach(cleanup);

describe("Gallery component", () => {
  const photos = [
    { id: "1", src: "photo1.jpg" },
    { id: "2", src: "photo2.jpg" },
    { id: "3", src: "photo3.jpg" },
  ];

  it("renders correctly", () => {
    // act
    const tree = rendeder.create(<Gallery photos={photos} onPhotoSelect={() => { }} />).toJSON();

    // assert
    expect(tree).toMatchSnapshot();
  });

  it("should render the correct number of photos", () => {
    // act
    const { getAllByRole } = render(
      <Gallery photos={photos} onPhotoSelect={() => { }} />,
    );

    // assert
    expect(getAllByRole("img").length).toEqual(3);
  });

  it("renders the images with the correct src attributes", () => {
    // act
    const { getAllByAltText } = render(
      <Gallery photos={photos} onPhotoSelect={() => { }} />,
    );

    // assert
    getAllByAltText("").forEach((img, index) => {
      expect((img as HTMLImageElement).src).toContain(photos[index].src);
    });
  });

  it("should call the onPhotoSelect callback when a photo is clicked", () => {
    // arrange
    const onPhotoSelect = jest.fn();
    const photos = [{ id: "1", src: "photo1.jpg" }];

    // act
    const { getByRole } = render(
      <Gallery photos={photos} onPhotoSelect={onPhotoSelect} />,
    );
    fireEvent.click(getByRole("img"));

    // assert
    expect(onPhotoSelect).toHaveBeenCalledWith({ id: "1", src: "photo1.jpg" });
  });
});
