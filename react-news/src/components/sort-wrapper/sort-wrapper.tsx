/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, FC } from 'react';
import { useDispatch } from 'react-redux';
import { sortValueAction } from '../../store/action-creators/home-page';
import { IInpuntsRadio } from '../interfaces';
import './sort-wrapper.css';

const SortWrapper: FC = () => {
  const dipatch = useDispatch();
  const onChangeSortBy = (e: ChangeEvent<HTMLInputElement>) => {
    dipatch(sortValueAction(e.target.value));
  };

  const inputsRadioSort: IInpuntsRadio[] = [
    {
      name: 'newest',
      sortBy: 'publishedAt',
      dataTestid: 'newest',
    },
    {
      name: 'more suitable',
      sortBy: 'relevancy',
      dataTestid: 'more',
    },
    {
      name: 'popular',
      sortBy: 'popularity',
      dataTestid: 'popular',
    },
  ];

  const inputsRadio = inputsRadioSort.map((radioButton) => {
    return (
      <div key={radioButton.name}>
        <input
          className="radio"
          type="radio"
          id={radioButton.name}
          value={radioButton.sortBy}
          name="sort"
          onChange={onChangeSortBy}
          data-testid={radioButton.dataTestid}
        />
        <label htmlFor={radioButton.name} className="newest_sort">
          {radioButton.name}
        </label>
      </div>
    );
  });

  return (
    <div className="sort__wrapper">
      <div className="title__sort title">Sort by: </div>
      <div className="inputs__wrapper">{inputsRadio}</div>
    </div>
  );
};

export default SortWrapper;
