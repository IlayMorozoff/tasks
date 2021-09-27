import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '../loader/loader';

it('loader renders', () => {
  render(<Loader />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
