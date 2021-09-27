/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../store/action-creators/home-page';
import { RootState } from '../../store/reducers';
import CardsNewsContainer from '../card-news-container/card-news-container';
import CounterPages from '../counter-page/counter-page';
import ErrorFetch from '../error/errorFetch';
import { IHomePageState, INewsState } from '../interfaces';
import Loader from '../loader/loader';
import Pagination from '../pagination/pagination';
import SearchPanel from '../search-panel/search-panel';
import SortWrapper from '../sort-wrapper/sort-wrapper';
import './home-page.css';

const HomePage: FC = () => {
  const { searchValue, newsPerPage, currentPage, sortValue } = useSelector<
    RootState,
    IHomePageState
  >((state) => state.homePage);
  const { loading, error } = useSelector<RootState, INewsState>((state) => state.fetchArticles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArticles(searchValue, currentPage, newsPerPage, sortValue));
  }, [currentPage]);

  const check = Number(newsPerPage) * Number(currentPage);

  const errorForField =
    check <= 100 ? null : (
      <div className="error">
        this API allows you to output only 100 news for free, so an error may occur when the value
        is given
      </div>
    );

  const loader = loading ? <Loader /> : <CardsNewsContainer />;

  const errorFetch = error ? <ErrorFetch /> : null;
  return (
    <>
      <div className="search_sort">
        <SearchPanel />
        <SortWrapper />
      </div>
      <div className="wrapper_pag_count">
        <Pagination />
        <CounterPages />
        {errorForField}
      </div>
      <>{loader}</>
      <>{errorFetch}</>
    </>
  );
};

export default HomePage;
