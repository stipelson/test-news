import { loadNews, apiKey, url } from '../actions';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import {
  FETCH_NEWS,
  FETCH_NEWS_SUCCESS,
  FETCH_NEW_ERROR,
  FETCH_MORE_SUCCESS,
} from '../contants';

describe('Fetch news list', () => {
  const article = {
    body: '- The advancements in the field  ...',
    image:
      'https://cdn.pixabay.com/photo/2016/03/21/23/25/link-1271843_960_720.png',
    title: 'Constant Technological ...',
    url: 'https://www.google.com',
  };

  const data = {
    articles: {
      count: 4,
      page: 1,
      pages: 25153,
      results: [article, article, article, article],
      totalResults: 100611,
    },
  };

  const store = mockStore({
    app: {
      loading: false,
      articles: [],
      error: null,
    },
  });

  beforeAll(() => {
    axios.__setValue({ data });
  });

  it('Should fetch news list, only response', async () => {
    store
      .dispatch(
        loadNews({
          options: {
            articlesPage: 1,
            uri: '5dfccaa7-e8ab-4044-8355-b6bebba95499',
          },
          reload: true,
          noAlert: true,
        })
      )
      .then((response) => {
        expect(response).toEqual({ data });

        let options = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          params: {
            apiKey,
            articleBodyLen: 245,
            articlesCount: 4,
            articlesPage: 1,
            articlesSortBy: 'date',
            dataType: ['news'],
            resultType: 'articles',
            uri: '5dfccaa7-e8ab-4044-8355-b6bebba95499',
          },
        };

        // Check if axios is called
        expect(axios.get).toHaveBeenCalledWith(url, options);
      });
  });

  it('should dispatch fetch news action', async () => {
    const expectedActions = [
      { type: FETCH_NEWS },
      {
        type: FETCH_NEWS_SUCCESS,
        articles: data.articles.results,
      },
    ];

    store.clearActions();
    store
      .dispatch(
        loadNews({
          options: {
            articlesPage: 1,
            uri: '5dfccaa7-e8ab-4044-8355-b6bebba95499',
          },
          reload: true,
          noAlert: true,
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Should fetch more articles', async () => {
    const expectedActions = [
      { type: FETCH_NEWS },
      { type: FETCH_MORE_SUCCESS, articles: data.articles.results },
    ];

    store.clearActions();

    store
      .dispatch(
        loadNews({
          options: {
            articlesPage: 1,
            uri: '5dfccaa7-e8ab-4044-8355-b6bebba95499',
          },
          reload: false,
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should dispatch fetch news, with bad response from axios', async () => {
    const newData = {
      count: 0,
      error: true,
    };
    axios.__setValue({ data: newData });

    const expectedActions = [
      { type: FETCH_NEWS },
      { type: FETCH_NEW_ERROR, error: 'error on response' },
    ];

    store.clearActions();

    store
      .dispatch(
        loadNews({
          options: {
            articlesPage: 1,
            uri: '5dfccaa7-e8ab-4044-8355-b6bebba95499',
          },
          reload: true,
        })
      )
      .then(() => {
        // console.log(store);
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('catch error axios', () => {
    const expectedActions = [
      { type: FETCH_NEWS },
      { type: FETCH_NEW_ERROR, error: 'Bad url' },
    ];

    store.clearActions();

    store
      .dispatch(
        loadNews({
          options: {
            articlesPage: 1,
            uri: '5dfccaa7-e8ab-4044-8355-b6bebba95499',
          },
          reload: true,
          urlTest: 'Test error',
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
