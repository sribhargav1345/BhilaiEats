import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';

// Mock the useNavigate function
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

test('renders Login component', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText(/Email address/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const submitButton = screen.getByRole('button', { name: /Submit/i });
  const newUserButton = screen.getByRole('link', { name: /I'm a new user/i });

  // Assert that these elements are present in the rendered content
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(newUserButton).toBeInTheDocument();
});

test('handles form submission correctly', async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  // Mock fetch API
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ success: true, authToken: 'fakeAuthToken' }),
    })
  );

  const emailInput = screen.getByLabelText(/Email address/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const submitButton = screen.getByRole('button', { name: /Submit/i });

  // Simulate user input
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Simulate form submission
  fireEvent.click(submitButton);

  // Wait for the async function to complete
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/loginUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'pswd',
      }),
    });
  });

  // Assert that the user is redirected after successful login
  const { useNavigate } = require('react-router-dom');
  expect(useNavigate).toHaveBeenCalledWith('/');
});
