import { loadNews, apiKey, url } from '../actions';
import axios from 'axios';

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

  beforeAll(() => {
    axios.__setValue({ data });
  });

  it('Should fetch news list', async () => {
    const gen = loadNews({
      options: { articlesPage: 1, uri: '5dfccaa7-e8ab-4044-8355-b6bebba95499' },
      reload: true,
    });
    const value = await gen();
    expect(value).toEqual({ data });

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

    expect(axios.get).toHaveBeenCalledWith(url, options);
  });
});
