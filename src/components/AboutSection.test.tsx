import { render, screen } from '@testing-library/react';
import AboutSection from './AboutSection';
import { describe, it, expect, vi } from 'vitest';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

describe('AboutSection Component', () => {
  it('renders the avatar image with correct alt text', () => {
    render(<AboutSection />);
    const img = screen.getByAltText('Abelion Lavv');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://ik.imagekit.io/focustimerin/preview%20image1?updatedAt=1757343104763');
  });

  it('has loading="lazy" and explicit dimensions', () => {
    render(<AboutSection />);
    const img = screen.getByAltText('Abelion Lavv');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('width', '256');
    expect(img).toHaveAttribute('height', '256');
  });
});
