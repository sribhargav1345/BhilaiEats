// test 1

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
test('renders learn react link', () => {
  const { getByText } = render(<App />); //render is from @testing-library/react
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument(); //expect assertion is from Jest
});