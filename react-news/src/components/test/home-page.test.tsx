import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import store from '../../store';
import { App } from '../app/app';
import { article } from './fakeData';

(window as any).fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(article),
    status: 200,
  }),
);

describe('home page', () => {
  it('should render the home page', () => {
    const history = createMemoryHistory();

    const { container, getByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>,
    );
    const nav = getByTestId('nav');
    const link = getByTestId('home');
    expect(container.innerHTML).toMatch('Home');
    expect(nav).toContainElement(link);
    expect(link).toHaveClass('selected');
  });

  it('fetches news from an API', () => {
    const history = createMemoryHistory();

    const { getByTestId, getByPlaceholderText, getByText } = render(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>,
    );

    const searchPanel = getByPlaceholderText(/Search news/i);
    const searchButton = getByText('Search');
    const newsPerPage = getByPlaceholderText('10');
    const currentPage = getByPlaceholderText('1');
    const buttonPrev = getByText(/Prev/i);
    const buttonNext = getByText(/Next/i);
    const countCurrentPage = getByText(/Current page/i);
    fireEvent.change(searchPanel, {
      target: { value: 'science' },
    });
    expect(searchPanel).toHaveValue('science');
    fireEvent.change(newsPerPage, {
      target: { value: '10' },
    });
    expect(newsPerPage).toHaveValue(10);
    expect(searchPanel).toHaveValue('science');
    fireEvent.change(currentPage, {
      target: { value: '1' },
    });
    expect(currentPage).toHaveValue(1);
    expect(countCurrentPage.textContent).toBe('Current page: 1');

    userEvent.click(buttonNext);
    expect(countCurrentPage.textContent).toBe('Current page: 2');
    expect(currentPage).toHaveValue(2);
    userEvent.click(buttonPrev);
    expect(countCurrentPage.textContent).toBe('Current page: 1');
    expect(currentPage).toHaveValue(1);
    userEvent.click(getByTestId('newest'));
    expect(getByTestId('newest')).toBeChecked();
    userEvent.click(searchButton);
    return screen
      .findAllByTestId('list-item')
      .then((dataRender) => {
        expect(dataRender).toHaveLength(1);
      })
      .catch((err) => expect(err).toHaveTextContent('NEWS CANNOT TO BE GOT'));
  });

  it('should navigate to the about page', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>,
    );
    const leftClick = { button: 0 };
    userEvent.click(getByTestId('about'), leftClick);
    expect(history.location.pathname).toBe('/about');
    expect(screen.queryByText(/only provide 100 news for free/i));
  });
});
