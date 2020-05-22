import {
  FETCH_NEWS,
  FETCH_NEWS_SUCCESS,
  FETCH_NEW_ERROR,
  FETCH_MORE_SUCCESS,
} from './contants';

import request from '../lib/request';

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

    const apiKey = '65e9cbc8-be98-4b0e-a423-005257373b5f';
    const url =
      'http://eventregistry.org/api/v1/article/getArticlesForTopicPage';

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
