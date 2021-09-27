import { INewsState, NewsAction, NewsActionsTypes } from '../../components/interfaces';

export const initialState: INewsState = {
  articles: [],
  loading: false,
  error: null,
};

const newsReducer = (state = initialState, action: NewsAction): INewsState => {
  switch (action.type) {
    case NewsActionsTypes.FETCH_ARTICLES:
      return { loading: true, error: null, articles: [] };
    case NewsActionsTypes.FETCH_ARTICLES_SUCCESS:
      return { loading: false, error: null, articles: action.payload };
    case NewsActionsTypes.FETCH_ARTICLES_ERROR:
      return { loading: false, error: action.payload, articles: [] };
    default:
      return state;
  }
};

export default newsReducer;
