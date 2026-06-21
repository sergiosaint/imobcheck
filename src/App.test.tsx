import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const heading = screen.getByText(/Calculador de Rentabilidade de Investimento Imobiliário/i);
  expect(heading).toBeInTheDocument();
});
