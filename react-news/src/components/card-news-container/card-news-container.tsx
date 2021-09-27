import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';
import CardNews from '../card-news/card-news';
import { INewsState } from '../interfaces';
import './card-news-container.css';

const CardsNewsContainer: FC = () => {
  const { articles } = useSelector<RootState, INewsState>((state) => state.fetchArticles);
  const news = articles.map((article) => {
    return <CardNews {...article} key={article.id} />;
  });
  return <ul className="card_container">{news}</ul>;
};

export default CardsNewsContainer;
