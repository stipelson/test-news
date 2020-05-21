import { TOGGLE_DARKMODE } from './contants';

import request from '../lib/request';

export const toggleDarkMode = (isDarkMode) => ({
  type: TOGGLE_DARKMODE,
  isDarkMode,
});

export function loadNews(options = {}) {
  console.log('holongo');
  return async (dispatch) => {
    dispatch(toggleDarkMode(true));

    const apiKey = '7f8097e33ad945a9878f479dc1fff0bf';
    const url = 'https://newsapi.org/v2/top-headlines';

    /* const url =
      'https://newsapi.org/v2/top-headlines?country=us&category=' +
      'health' +
      '&pageSize=4&page=' +
      1 +
      '&apiKey=' +
      newsApiKey; */
    // const url = 'https://petstore.swagger.io/v2/swagger.json';
    console.log(options);

    let params = {
      country: 'us',
      category: 'health',
      pageSize: 4,
      page: 1,
      apiKey,
      ...options,
    };

    return request({ url, options: { query: params } })
      .then((response) => {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        alert(error);
      });
  };
}
