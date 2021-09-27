import { IArticle } from '../interfaces';

export const data: IArticle[] = [
  {
    author: 'Ilya Morozov',
    content: 'dsadsadsadsa',
    description: 'dsadsadsadsa',
    title: 'dsadsadsadas',
    url: 'dsadsad',
    urlToImage: 'www.getByText.ru',
    id: Math.random() + 1,
    totalResults: 1,
  },
];

export const article: { status: string; totalResults: number; articles: Array<IArticle> } = {
  status: 'ok',
  totalResults: 4552,
  articles: data,
};
