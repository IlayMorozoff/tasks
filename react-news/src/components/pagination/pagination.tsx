import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  pagePaginatioNextAction,
  pagePaginatioPrevAction,
} from '../../store/action-creators/pagination';
import { RootState } from '../../store/reducers';
import { IHomePageState } from '../interfaces';
import NumberPages from '../number-pages/number-pages';
import './pagination.css';

const Pagination: FC = () => {
  const { newsPerPage, currentPage } = useSelector<RootState, IHomePageState>(
    (state) => state.homePage,
  );
  const dispatch = useDispatch();
  const disabledBtnNext = Number(newsPerPage) * Number(currentPage) >= 100;
  const disabledBtnPrev = Number(currentPage) <= 1;

  const onPrevClick = () => {
    dispatch(pagePaginatioPrevAction());
  };

  const onNextClick = () => {
    dispatch(pagePaginatioNextAction());
  };

  return (
    <div className="pagination">
      <button
        className="button pagination_btn"
        type="button"
        disabled={disabledBtnPrev}
        onClick={onPrevClick}
      >
        Prev
      </button>
      <NumberPages />
      <button
        className="button pagination_btn"
        type="button"
        disabled={disabledBtnNext}
        onClick={onNextClick}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
