import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import store from '../../store';
import SortWrapper from '../sort-wrapper/sort-wrapper';

it('sort checkboxs renders and works correctly', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <SortWrapper />
    </Provider>,
  );
  expect(getByTestId('newest')).not.toBeChecked();
  expect(getByTestId('more')).not.toBeChecked();
  expect(getByTestId('popular')).not.toBeChecked();

  userEvent.click(getByTestId('newest'));
  expect(getByTestId('newest')).toBeChecked();
  userEvent.click(getByTestId('popular'));
  expect(getByTestId('popular')).toBeChecked();
  userEvent.click(getByTestId('more'));
  expect(getByTestId('more')).toBeChecked();
});
