import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorFetch from '../error/errorFetch';

it('errorFetch renders', () => {
  const { getByText } = render(<ErrorFetch />);
  const text = getByText(/no news was found for this request/i);
  expect(text).toBeInTheDocument();
});
