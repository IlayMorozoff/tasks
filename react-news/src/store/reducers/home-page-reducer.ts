import { IHomePageState, PageAction, PageActionsTypes } from '../../components/interfaces';

export const initialState: IHomePageState = {
  searchValue: '',
  newsPerPage: '',
  currentPage: '',
  allPagesValue: 0,
  sortValue: '',
};

const homePageReducer = (state = initialState, action: PageAction): IHomePageState => {
  switch (action.type) {
    case PageActionsTypes.SEARCH_VALUE:
      return { ...state, searchValue: action.payload };
    case PageActionsTypes.NEWS_PER_PAGE:
      return { ...state, newsPerPage: action.payload };
    case PageActionsTypes.CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case PageActionsTypes.ALL_VALUE_PAGES:
      return { ...state, allPagesValue: action.payload };
    case PageActionsTypes.SORT_VALUE:
      return { ...state, sortValue: action.payload };
    case PageActionsTypes.PAGE_PAGINATION_NEXT:
      return { ...state, currentPage: String(Number(state.currentPage) + 1) };
    case PageActionsTypes.PAGE_PAGINATION_PREV:
      return { ...state, currentPage: String(Number(state.currentPage) - 1) };
    default:
      return state;
  }
};

export default homePageReducer;
