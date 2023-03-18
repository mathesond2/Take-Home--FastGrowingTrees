import { testProducts } from '@/util';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  it('renders product links', () => {
    render(<Home products={testProducts} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });
});
