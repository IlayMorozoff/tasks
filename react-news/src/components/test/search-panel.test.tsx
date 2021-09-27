import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import store from '../../store';
import SearchPanel from '../search-panel/search-panel';

describe('search panel', () => {
  it('search panel renders and change event works correctly', async () => {
    const { container } = render(
      <Provider store={store}>
        <SearchPanel />
      </Provider>,
    );
    const input = screen.getByRole('textbox');
    const buttonSearch = screen.getByRole('button');
    fireEvent.change(input, {
      target: { value: 'React' },
    });
    expect(input).toHaveValue('React');
    expect(container.innerHTML).toMatch('React');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(input).toHaveValue('');
    fireEvent.change(input, {
      target: { value: 'The Rolling Scope School' },
    });
    userEvent.click(buttonSearch);
    expect(input).toHaveValue('');
    fireEvent.change(input, {
      target: { value: 'Ilay Morozov' },
    });
    fireEvent.keyDown(input, { key: 'Enter', code: 'NumpadEnter' });
    expect(input).toHaveValue('');
  });
});
