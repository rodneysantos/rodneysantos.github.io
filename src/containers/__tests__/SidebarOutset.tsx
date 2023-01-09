import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';
import rendeder from "react-test-renderer";
import SidebarOutset, { useSidebarOutset } from '../SidebarOutset';

afterEach(cleanup);

describe('SidebarOutset', () => {
  it("renders correctly", () => {
    // act
    const tree = rendeder.create(<SidebarOutset value={false}>
      <div data-testid="test-element">Test Element</div>
    </SidebarOutset>).toJSON();

    // assert
    expect(tree).toMatchSnapshot();
  });

  it('renders the children inside a div element with the correct class names', () => {
    // act
    const { getByTestId } = render(
      <SidebarOutset value={false}>
        <div data-testid="test-element">Test Element</div>
      </SidebarOutset>
    );
    const element = getByTestId('test-element');

    // assert
    expect(element).toBeInTheDocument();
    expect(element.parentElement).toHaveClass(
      'flex',
      'fixed',
      'font-dosis',
      'h-screen',
      'transition-transform',
      'lg:duration-200',
      '3xl:duration-300'
    );
  });

  it('adds the "-translate-x-[90%]" class when isVisible is false', () => {
    // act
    const { getByTestId } = render(
      <SidebarOutset value={false}>
        <div data-testid="test-element">Test Element</div>
      </SidebarOutset>
    );
    const element = getByTestId('test-element').parentElement;

    // assert
    expect(element).toHaveClass('-translate-x-[90%]');
  });

  it('does not add the "-translate-x-[90%]" class when isVisible is true', () => {
    // act
    const { getByTestId } = render(
      <SidebarOutset value={true}>
        <div data-testid="test-element">Test Element</div>
      </SidebarOutset>
    );
    const element = getByTestId('test-element').parentElement;

    // assert
    expect(element).not.toHaveClass('-translate-x-[90%]');
  });

  it('provides the correct values for the SidebarOutsetContext', () => {
    // assemble
    const TestComponent: React.FC = () => {
      const { isVisible, setIsVisible } = useSidebarOutset();
      return (
        <div>
          <span data-testid="is-visible">{isVisible.toString()}</span>
          <button onClick={() => setIsVisible(true)} data-testid="set-is-visible" />
        </div>
      );
    };

    // act
    const { getByTestId } = render(
      <SidebarOutset value={false}>
        <TestComponent />
      </SidebarOutset>
    );

    // assert
    const isVisibleElement = getByTestId('is-visible');
    expect(isVisibleElement).toHaveTextContent('false');

    const setIsVisibleButton = getByTestId('set-is-visible');
    fireEvent.click(setIsVisibleButton);
    expect(isVisibleElement).toHaveTextContent('true');
  });
});