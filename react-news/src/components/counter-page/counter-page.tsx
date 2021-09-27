/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentPageAction, newsPerPageAction } from '../../store/action-creators/home-page';
import { RootState } from '../../store/reducers';
import './counter-page.css';

const CounterPages: FC = () => {
  const newsPerPage = useSelector<RootState, string>((state) => state.homePage.newsPerPage);
  const currentPage = useSelector<RootState, string>((state) => state.homePage.currentPage);
  const dispatch = useDispatch();

  const onChangeNewsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(newsPerPageAction(e.target.value));
  };

  const onChangeCurrentPage = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(currentPageAction(e.target.value));
  };

  return (
    <div className="pages_counters">
      <div className="total_page counter">
        <label className="title_total title" htmlFor="page_number">
          News per Page
        </label>
        <input
          type="number"
          className="page_number"
          id="page_number"
          placeholder="10"
          value={newsPerPage}
          min="1"
          onChange={onChangeNewsPerPage}
        />
      </div>
      <div className="total_page counter">
        <label className="title_total title" htmlFor="current">
          Go to the page:
        </label>
        <input
          type="number"
          className="page_number"
          id="current"
          placeholder="1"
          min="1"
          value={currentPage}
          onChange={onChangeCurrentPage}
        />
      </div>
    </div>
  );
};

export default CounterPages;
