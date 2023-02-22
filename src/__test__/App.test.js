import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Foods from '../Foods';
import FoodOrder from '../FoodOrder';

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

  describe('When an user clicks on Order Food button', () => {
    it('should render Foods', async() => {
      render(<App />);
      const toggleBtn = screen.getByText('Order Food');
      userEvent.click(toggleBtn);
      expect(await screen.findByText('Choose from our Menu')).toBeVisible()
      expect(await screen.findByText('Fried chicken burger - lettuce, tomato, cheese and mayonnaise')).toBeVisible()
    })
  })
})

describe('should match snapshot', () => {
  const tree = renderer.create(<App/>).toJSON();
  expect(tree).toMatchSnapshot();
})

afterEach(() => {
  cleanup();
})
