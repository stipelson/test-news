import {
  FETCH_NEWS,
  FETCH_NEWS_SUCCESS,
  FETCH_NEW_ERROR,
  FETCH_MORE_SUCCESS,
} from './contants';

import request from '../lib/request';

const apiKey = process.env.NEWS_KEY;
const url = process.env.NEWS_URL;

export const fetchNewsSuccess = (articles) => ({
  type: FETCH_NEWS_SUCCESS,
  articles,
});

export const fetchMoreNewsSuccess = (articles) => ({
  type: FETCH_MORE_SUCCESS,
  articles,
});

export const fetchNewsError = (error) => ({
  type: FETCH_NEW_ERROR,
  error,
});

export function loadNews({ options, reload = false }) {
  return async (dispatch) => {
    dispatch({ type: FETCH_NEWS });

    let params = {
      uri: '5dfccaa7-e8ab-4044-8355-b6bebba95499',
      dataType: ['news'],
      resultType: 'articles',
      articlesSortBy: 'date',
      articleBodyLen: 245,
      apiKey: apiKey,
      articlesPage: 1,
      articlesCount: 4,
      ...options,
    };

    return request({ url, options: { params } })
      .then((response) => {
        // handle success
        if (
          response.data &&
          response.data.articles &&
          response.data.articles &&
          Array.isArray(response.data.articles.results)
        ) {
          if (!reload)
            dispatch(fetchMoreNewsSuccess(response.data.articles.results));
          else dispatch(fetchNewsSuccess(response.data.articles.results));
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
        dispatch(fetchNewsError(error));
      });
  };
}
