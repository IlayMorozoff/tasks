import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, searchValueAction } from '../../store/action-creators/home-page';
import { RootState } from '../../store/reducers';
import { IHomePageState } from '../interfaces';
import './search-panel.css';

const SearchPanel: FC = () => {
  const { searchValue, newsPerPage, sortValue, currentPage } = useSelector<
    RootState,
    IHomePageState
  >((state) => state.homePage);
  const dispatch = useDispatch();
  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchValueAction(e.target.value));
  };

  const onChangeSearchEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      dispatch(fetchArticles(searchValue || 'science', currentPage, newsPerPage, sortValue));
      dispatch(searchValueAction(''));
    }
  };

  const onClickSearchButton = () => {
    dispatch(fetchArticles(searchValue || 'science', currentPage, newsPerPage, sortValue));
    dispatch(searchValueAction(''));
  };

  return (
    <div className="search__panel__wrapper">
      <input
        className="search"
        type="text"
        placeholder="Search news"
        // disabled={disableButton}
        value={searchValue}
        onChange={onChangeSearch}
        onKeyDown={onChangeSearchEnter}
      />
      <button
        className="button"
        type="button"
        onClick={onClickSearchButton}
        // disabled={disableButton}
      >
        Search
      </button>
    </div>
  );
};

export default SearchPanel;
