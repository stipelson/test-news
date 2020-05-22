import {
  FETCH_NEWS,
  FETCH_NEWS_SUCCESS,
  FETCH_NEW_ERROR,
  FETCH_MORE_SUCCESS,
} from './contants';

const initialState = {
  loading: false,
  articles: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS:
      return { ...state, loading: true };
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.articles,
      };
    case FETCH_MORE_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: [...state.articles, ...action.articles],
      };
    case FETCH_NEW_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
