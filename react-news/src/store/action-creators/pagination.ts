import {
  IPagePaginationNextAction,
  IPagePaginationPrevAction,
  PageActionsTypes,
} from '../../components/interfaces';

export const pagePaginatioNextAction = (): IPagePaginationNextAction => ({
  type: PageActionsTypes.PAGE_PAGINATION_NEXT,
});

export const pagePaginatioPrevAction = (): IPagePaginationPrevAction => ({
  type: PageActionsTypes.PAGE_PAGINATION_PREV,
});
