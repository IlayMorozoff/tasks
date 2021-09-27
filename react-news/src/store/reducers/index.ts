import { combineReducers } from 'redux';
import homePageReducer from './home-page-reducer';
import newsReducer from './news-reducer';

const rootReducer = combineReducers({
  homePage: homePageReducer,
  fetchArticles: newsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
