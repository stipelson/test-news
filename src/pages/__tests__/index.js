import React from 'react';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Index from '../index';
import { StaticQuery } from 'gatsby';

const mockStore = configureStore([]);

describe('Index render', () => {
  let store;
  let component;

  beforeEach(() => {
    StaticQuery.mockImplementationOnce(({ render }) =>
      render({
        site: {
          siteMetadata: {
            title: 'Default Starter',
            description: 'Site description',
            author: 'site author',
          },
        },
      })
    );
  });

  it('renders correctly', () => {
    const data = {
      site: {
        siteMetadata: {
          title: 'Default Starter',
          description: 'Site description',
          author: 'site author',
        },
      },
    };

    store = mockStore({
      app: {
        loading: false,
        articles: [],
        error: null,
      },
    });

    store.dispatch = jest.fn();
    component = create(
      <Provider store={store}>
        <Index
          location={{
            search: '?category=5dfccaa7-e8ab-4044-8355-b6bebba95499',
          }}
          data={data}
          menuNav={false}
          userNav={false}
        />
      </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
