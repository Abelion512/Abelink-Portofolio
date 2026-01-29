import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { describe, it, expect } from 'vitest';

describe('Navbar Component', () => {
  it('renders navigation items correctly', () => {
    render(<Navbar />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders logo', () => {
    render(<Navbar />);
    expect(screen.getByText('IS')).toBeInTheDocument();
  });
});
