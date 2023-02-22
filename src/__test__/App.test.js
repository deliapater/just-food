import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import React from 'react';
import App from '../App';

afterEach(() => {
  cleanup();
})

describe('App tests', () => {
  it('should render App', () => {
    render(<App />);
    expect(App).toBeTruthy();
  });

  it('should contain toggle btn', () => {
    render(<App />);
    const toggleBtn = screen.getByText('Order Food');
    expect(toggleBtn).toBeTruthy()
  });

  it('should display title and subtitle', () => {
    render(<App />);
    const title =  screen.getByText('Just Food Online Shop');
    const subTitle =  screen.getByText('Menu Availability');
    expect(title).toBeTruthy();
    expect(subTitle).toBeTruthy();
    expect(title).toBeInTheDocument();
  })

  it('should contain food elements', () => {
    render(<App/>);
    const foodEl = screen.getByTestId('food-el');
    expect(foodEl).toHaveTextContent('Arepa');
  })
})

describe('should match snapshot', () => {
  const tree = renderer.create(<App/>).toJSON();
  expect(tree).toMatchSnapshot();
})
