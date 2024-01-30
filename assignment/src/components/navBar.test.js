import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

// Mocking  the useNavigate function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mocking the useCart hook
jest.mock('../components/ContextReducer', () => ({
  ...jest.requireActual('../components/ContextReducer'),
  useCart: jest.fn(() => []),
}));

test('Navbar renders correctly', () => {
  render(<Navbar />);
  
  // Checking the "GoodFood" link is rendering or not
  expect(screen.getByText('GoodFood')).toBeInTheDocument();

  // Checking the "Home" link rendering 
  expect(screen.getByText('Home')).toBeInTheDocument();
});

test('Logout button works correctly', () => {
  render(<Navbar />);
  
  // Mocking the localStorage
  localStorage.setItem('authToken', 'fakeAuthToken');

  // Check if "My Orders" and "Logout" links are rendered when logged in
  expect(screen.getByText('My Orders')).toBeInTheDocument();
  expect(screen.getByText('Logout')).toBeInTheDocument();

  // Mocking useNavigate function
  const { useNavigate } = require('react-router-dom');
  useNavigate.mockReturnValue(jest.fn());

  // Mocking handleLogout function
  const handleLogoutSpy = jest.spyOn(Navbar.defaultProps, 'handleLogout');

  // Click on the "Logout" button
  fireEvent.click(screen.getByText('Logout'));

  // Check if handleLogout function is called
  expect(handleLogoutSpy).toHaveBeenCalled();
});
