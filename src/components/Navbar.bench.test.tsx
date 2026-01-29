import { render, cleanup } from '@testing-library/react';
import { describe, test, afterEach } from 'vitest';
import Navbar from './Navbar';
import React from 'react';

describe('Navbar Performance', () => {
  afterEach(() => {
    cleanup();
  });

  test('rendering performance baseline', () => {
    const iterations = 2000;
    const start = performance.now();

    for (let i = 0; i < iterations; i++) {
      const { unmount } = render(<Navbar />);
      unmount();
    }

    const end = performance.now();
    const duration = end - start;

    console.log(`Navbar render time for ${iterations} iterations: ${duration.toFixed(2)}ms`);
    console.log(`Average render time: ${(duration / iterations).toFixed(4)}ms`);
  });
});
