import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import store from '../../store';
import { App } from '../app/app';

describe('error 404', () => {
  it('error404 renders and click on go back link works correctly', () => {
    const history = createMemoryHistory();
    history.push('/wrong-route');
    const { getByTestId } = render(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>,
    );
    const link = getByTestId('goHome');
    expect(screen.getByAltText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe('/');
  });
});
