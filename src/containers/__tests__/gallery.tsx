import { cleanup, render } from '@testing-library/react';
import React from 'react';
import rendeder from "react-test-renderer";
import Gallery from '../gallery';

afterEach(cleanup);

describe('Gallery component', () => {
  const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

  it("renders correctly", () => {
    // act
    const tree = rendeder.create(<Gallery images={images} />);

    // assert
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct number of images', () => {
    // act
    const { getAllByAltText } = render(<Gallery images={images} />);

    // assert
    expect(getAllByAltText('').length).toEqual(images.length);
  });

  it('renders the images with the correct src attributes', () => {
    // act
    const { getAllByAltText } = render(<Gallery images={images} />);

    // assert
    getAllByAltText('').forEach((img, index) => {
      expect((img as HTMLImageElement).src).toContain(images[index]);
    });
  });
});
