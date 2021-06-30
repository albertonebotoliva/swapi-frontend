import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the textbox', () => {
  render(<App />);
  const multiselect = screen.getByRole('textbox');
  expect(multiselect).toBeInTheDocument();
});
test('We show the list of items', () => {
  render(<App />);

  fireEvent.click(screen.getByText('expand_more'));

  expect(screen.getByText('Aliment')).toBeInTheDocument();
});
