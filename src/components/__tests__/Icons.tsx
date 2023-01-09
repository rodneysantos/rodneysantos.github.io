import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import rendeder from "react-test-renderer";
import { ChevronIcon } from '../Icons';

afterEach(cleanup);

describe('ChevronIcon', () => {
  it("renders correctly", () => {
    // act
    const tree = rendeder.create(<ChevronIcon className="test-class" clickHandler={() => { }} />).toJSON();

    // assert
    expect(tree).toMatchSnapshot();
  });

  it('renders the icon with given class name', () => {
    // act
    const { getByTestId } = render(<ChevronIcon className="test-class" clickHandler={() => { }} />);
    const icon = getByTestId('chevron-icon') as unknown as SVGElement;

    // assert
    expect(icon).toBeInTheDocument();
    expect(icon.classList.contains('test-class')).toBeTruthy();
  });

  it('invokes the click handler when clicked', () => {
    // assemble
    const clickHandler = jest.fn();

    // act
    const { getByTestId } = render(<ChevronIcon className="test-class" clickHandler={clickHandler} />);
    const icon = getByTestId('chevron-icon');
    fireEvent.click(icon);

    // assert
    expect(clickHandler).toHaveBeenCalled();
  });
});
