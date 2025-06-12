import { render, screen } from '@testing-library/react';
import NotFound from '../not-found';

describe('NotFound', () => {
  it('renders not found page', () => {
    render(<NotFound />);
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
}); 