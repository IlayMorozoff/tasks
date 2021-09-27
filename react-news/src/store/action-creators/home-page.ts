import { Dispatch } from 'redux';
import {
  IAllPagesValueAction,
  IArticle,
  ICurrentPageAction,
  IFetchNewsAction,
  IFetchNewsErrorAction,
  IFetchNewsSuccessAction,
  INewsPerPageAction,
  ISearchAction,
  ISortValueAction,
  NewsAction,
  NewsActionsTypes,
  PageAction,
  PageActionsTypes,
} from '../../components/interfaces';
import newsApi from '../../services/news-service/news-service';

export const searchValueAction = (payload: string): ISearchAction => ({
  type: PageActionsTypes.SEARCH_VALUE,
  payload,
});

export const currentPageAction = (payload: string): ICurrentPageAction => ({
  type: PageActionsTypes.CURRENT_PAGE,
  payload,
});

export const newsPerPageAction = (payload: string): INewsPerPageAction => ({
  type: PageActionsTypes.NEWS_PER_PAGE,
  payload,
});

export const allPagesValueAction = (payload: number): IAllPagesValueAction => ({
  type: PageActionsTypes.ALL_VALUE_PAGES,
  payload,
});

export const sortValueAction = (payload: string): ISortValueAction => ({
  type: PageActionsTypes.SORT_VALUE,
  payload,
});

export const fetchNewsAction = (): IFetchNewsAction => ({
  type: NewsActionsTypes.FETCH_ARTICLES,
});

export const fetchNewsSuccessAction = (payload: IArticle[]): IFetchNewsSuccessAction => ({
  type: NewsActionsTypes.FETCH_ARTICLES_SUCCESS,
  payload,
});

export const fetchNewsErrorAction = (payload: string): IFetchNewsErrorAction => ({
  type: NewsActionsTypes.FETCH_ARTICLES_ERROR,
  payload,
});

export const fetchArticles = (
  searchField: string = 'science',
  pagePagination: string = '1',
  newsPerPage: string = '10',
  sortValue: string = 'publishedAt',
) => {
  return (dispatch: Dispatch<NewsAction | PageAction>) => {
    dispatch(fetchNewsAction());
    try {
      newsApi
        .getNews(searchField || 'science', pagePagination, newsPerPage, sortValue)
        .then((articles) => {
          if (articles) {
            dispatch(fetchNewsSuccessAction(articles));
            const { totalResults } = articles[0];
            dispatch(allPagesValueAction(totalResults));
          } else {
            dispatch(fetchNewsErrorAction('An error occurred when loading articles'));
          }
        });
    } catch (err) {
      dispatch(fetchNewsErrorAction('An error occurred when loading articles'));
    }
  };
};
