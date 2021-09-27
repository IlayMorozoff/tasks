import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import { IHomePageState } from '../interfaces';

const NumberPages: FC = () => {
  const allPagesValue = useSelector<RootState, number>((state) => state.homePage.allPagesValue);
  const { currentPage } = useSelector<RootState, IHomePageState>((state) => state.homePage);
  return (
    <div className="number_pages">
      <div className="current">Current page: {currentPage}</div>
      <div className="all_pages">All pages: {allPagesValue}</div>
    </div>
  );
};

export default NumberPages;
