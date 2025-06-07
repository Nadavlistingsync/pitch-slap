import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../not-found.tsx';

describe('NotFound', () => {
  it('renders the not found page with correct content', () => {
    render(<NotFound />);
    
    // Check for the main heading
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    
    // Check for the description
    expect(screen.getByText(/the page you're looking for doesn't exist or has been moved/i)).toBeInTheDocument();
    
    // Check for the home link
    const homeLink = screen.getByRole('link', { name: /return home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
}); 