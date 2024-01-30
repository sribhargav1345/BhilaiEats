import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from './Cart';
import { CartProvider, CartContext } from '../components/ContextReducer';

// Mock the useCart and useDispatchCart functions
jest.mock('../components/ContextReducer', () => ({
  ...jest.requireActual('../components/ContextReducer'),
  useCart: jest.fn(() => [{ name: 'Food Item 1', qty: 2, size: 'Medium', price: 10 }]),
  useDispatchCart: jest.fn(() => jest.fn()), // Assuming useDispatchCart returns a function
}));

test('renders Cart component', () => {
  render(
    <CartProvider>
      <Cart />
    </CartProvider>
  );

  // cart is yet to be completed therefore I am leaving a boilerplate.

  const foodItemElement = screen.getByText(/Food Item 1/i);
  const qtyElement = screen.getByText(/2/i);
  const sizeElement = screen.getByText(/Medium/i);
  const priceElement = screen.getByText(/10/i);
  const deleteButton = screen.getByRole('button', { name: 'Delete' });

  // Assert that these elements are present in the rendered content
  expect(foodItemElement).toBeInTheDocument();
  expect(qtyElement).toBeInTheDocument();
  expect(sizeElement).toBeInTheDocument();
  expect(priceElement).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});
