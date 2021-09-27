import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from '../about/about';

it('about page renders', () => {
  render(<About />);
  expect(screen.getByText(/only provide 100 news for free/i)).toBeInTheDocument();
});
