import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import store from '../../store';
import Pagination from '../pagination/pagination';

describe('pagination', () => {
  it('pagination renders and buttons prev/next works correctly, show count current page correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Pagination />
      </Provider>,
    );
    const buttonPrev = getByText(/Prev/i);
    const buttonNext = getByText(/Next/i);
    const countCurrentPage = getByText(/Current page/i);
    expect(countCurrentPage.textContent).toBe('Current page: ');
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    expect(countCurrentPage.textContent).toBe('Current page: 3');
    userEvent.click(buttonPrev);
    expect(countCurrentPage.textContent).toBe('Current page: 2');
  });
});
