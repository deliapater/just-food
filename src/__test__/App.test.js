import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('App tests', () => {
  it('should render App', () => {
    render(<App />);
    expect(App).toBeTruthy()
  });

  it('should contain toggle btn', () => {
    render(<App />);
    const toggleBtn = screen.getByText('Order Food');
    expect(toggleBtn).toBeTruthy()
  });
})
