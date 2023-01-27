import { fireEvent, render } from "@testing-library/react";
import React from "react";
import rendeder from "react-test-renderer";
import Gallery, { GalleryPhoto } from "../Gallery";

jest.mock("../gallery.module.css", () => ({
  photo: "test",
}));

describe("Gallery component", () => {
  const onPhotoSelect = jest.fn();
  const photos: GalleryPhoto[] = [
    { id: "1", src: "photo1.jpg", keywords: ["black-and-white", "color"] },
    { id: "2", src: "photo2.jpg", keywords: ["architecture", "color"] },
    { id: "3", src: "photo3.jpg", keywords: ["color"] },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    // arrange
    const tree = rendeder
      .create(
        <Gallery keywords={[]} photos={photos} onPhotoSelect={onPhotoSelect} />,
      )
      .toJSON();

    // assert
    expect(tree).toMatchSnapshot();
  });

  it("renders the correct number of photos", () => {
    // arrange
    const { getAllByRole } = render(
      <Gallery keywords={[]} photos={photos} onPhotoSelect={onPhotoSelect} />,
    );

    // assert
    expect(getAllByRole("img").length).toEqual(3);
  });

  it("renders the images with the correct src attributes", () => {
    // arrange
    const { getAllByAltText } = render(
      <Gallery keywords={[]} photos={photos} onPhotoSelect={onPhotoSelect} />,
    );

    // assert
    getAllByAltText("").forEach((img, index) => {
      expect((img as HTMLImageElement).src).toContain(photos[index].src);
    });
  });

  it("calls the onPhotoSelect callback when a photo is clicked", () => {
    // arrange
    const { getByRole } = render(
      <Gallery
        keywords={[]}
        photos={[photos[0]]}
        onPhotoSelect={onPhotoSelect}
      />,
    );

    // act
    fireEvent.click(getByRole("img"));

    // assert
    expect(onPhotoSelect).toHaveBeenCalledWith({
      id: "1",
      src: "photo1.jpg",
      keywords: ["black-and-white", "color"],
    });
  });

  it("only displays one (1) photo when 'black-and-white' keyword is given", () => {
    // arrange
    const { getAllByRole } = render(
      <Gallery
        keywords={["black-and-white"]}
        photos={photos}
        onPhotoSelect={onPhotoSelect}
      />,
    );

    // act
    const images = getAllByRole("img");

    // assert
    expect(images.length).toEqual(1);
  });

  it("displays all photos when 'color' keyword is given", () => {
    // arrange
    const { getAllByRole } = render(
      <Gallery
        keywords={["color"]}
        photos={photos}
        onPhotoSelect={onPhotoSelect}
      />,
    );

    // act
    const images = getAllByRole("img");

    // assert
    expect(images.length).toEqual(3);
  });

  it("displays all photos when no keywords are given", () => {
    // arrange
    const { getAllByRole } = render(
      <Gallery keywords={[]} photos={photos} onPhotoSelect={onPhotoSelect} />,
    );

    // act
    const images = getAllByRole("img");

    // assert
    expect(images.length).toEqual(3);
  });
});
