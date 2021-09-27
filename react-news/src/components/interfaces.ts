export interface IArticle {
  author: string;
  content: string;
  description: string;
  title: string;
  url: string;
  urlToImage: string;
  id: number;
  totalResults: number;
}

export interface IPanelSearchProps {
  disableButton: boolean;
}

export interface IInpuntsRadio {
  name: string;
  sortBy: string;
  dataTestid: string;
}

export interface IArticleServer {
  author: string;
  content: string;
  description: string;
  source: ISourceServ;
  title: string;
  url: string;
  urlToImage: string;
}

interface ISourceServ {
  id: string | null;
  name: string | null;
}

export enum PageActionsTypes {
  SEARCH_VALUE = 'SEARCH_VALUE',
  NEWS_PER_PAGE = 'NEWS_PER_PAGE',
  CURRENT_PAGE = 'CURRENT_PAGE',
  ALL_VALUE_PAGES = 'ALL_VALUE_PAGES',
  SORT_VALUE = 'SORT_VALUE',
  PAGE_PAGINATION_NEXT = 'PAGE_PAGINATION_NEXT',
  PAGE_PAGINATION_PREV = 'PAGE_PAGINATION_PREV',
}

export enum PaginationActionTypes {
  PAGE_PAGINATION_NEXT = 'PAGE_PAGINATION_NEXT',
  PAGE_PAGINATION_PREV = 'PAGE_PAGINATION_PREV',
}

export enum NewsActionsTypes {
  FETCH_ARTICLES = 'FETCH_ARTICLES',
  FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS',
  FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR',
}

export interface IHomePageState {
  searchValue: string;
  newsPerPage: string;
  currentPage: string;
  allPagesValue: number;
  sortValue: string;
}

export interface IPaginationState {
  pagePagination: number;
}

export interface INewsState {
  articles: IArticle[];
  loading: boolean;
  error: null | string;
}

export interface ISearchAction {
  type: PageActionsTypes.SEARCH_VALUE;
  payload: string;
}

export interface INewsPerPageAction {
  type: PageActionsTypes.NEWS_PER_PAGE;
  payload: string;
}

export interface ICurrentPageAction {
  type: PageActionsTypes.CURRENT_PAGE;
  payload: string;
}

export interface IAllPagesValueAction {
  type: PageActionsTypes.ALL_VALUE_PAGES;
  payload: number;
}

export interface IPagePaginationNextAction {
  type: PageActionsTypes.PAGE_PAGINATION_NEXT;
}

export interface IPagePaginationPrevAction {
  type: PageActionsTypes.PAGE_PAGINATION_PREV;
}

export interface ISortValueAction {
  type: PageActionsTypes.SORT_VALUE;
  payload: string;
}

export interface IFetchNewsSuccessAction {
  type: NewsActionsTypes.FETCH_ARTICLES_SUCCESS;
  payload: IArticle[];
}

export interface IFetchNewsErrorAction {
  type: NewsActionsTypes.FETCH_ARTICLES_ERROR;
  payload: string;
}

export interface IFetchNewsAction {
  type: NewsActionsTypes.FETCH_ARTICLES;
}

export type PageAction =
  | ISearchAction
  | INewsPerPageAction
  | ICurrentPageAction
  | IAllPagesValueAction
  | ISortValueAction
  | IPagePaginationNextAction
  | IPagePaginationPrevAction;

export type PaginationAction = IPagePaginationNextAction | IPagePaginationPrevAction;

export type NewsAction = IFetchNewsSuccessAction | IFetchNewsErrorAction | IFetchNewsAction;
