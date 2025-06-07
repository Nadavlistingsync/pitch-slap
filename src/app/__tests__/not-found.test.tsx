import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../not-found';

describe('NotFound', () => {
  it('renders the not found page', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText(/The page you're looking for doesn't exist/)).toBeInTheDocument();
    expect(screen.getByText('Return Home')).toBeInTheDocument();
    expect(screen.getByText('Return Home')).toHaveAttribute('href', '/');
  });
}); 