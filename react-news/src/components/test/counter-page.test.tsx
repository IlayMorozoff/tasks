import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import store from '../../store';
import CounterPages from '../counter-page/counter-page';

describe('counters pages', () => {
  it('counters pages renders and works correctly', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <CounterPages />
      </Provider>,
    );
    const newsPerPage = getByPlaceholderText('10');
    const currentPage = getByPlaceholderText('1');
    expect(newsPerPage).toHaveValue(null);
    expect(currentPage).toHaveValue(null);
    fireEvent.change(newsPerPage, {
      target: { value: '5' },
    });
    fireEvent.change(currentPage, {
      target: { value: '3' },
    });
    expect(newsPerPage).toHaveValue(5);
    expect(currentPage).toHaveValue(3);
  });
});
