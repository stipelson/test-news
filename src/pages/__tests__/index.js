import React from 'react';
import { create, act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Index from '../index';
import Button from 'emerald-ui/lib/Button';
import thunk from 'redux-thunk';
import axios from 'axios';

import { createStore, applyMiddleware } from 'redux';
import reducer, { initialState } from '../../state/app';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

const mockStore = configureStore([thunk]);

describe('Index render', () => {
  const renderWithRedux = (
    component,
    {
      initialState,
      store = createStore(reducer, initialState, applyMiddleware(thunk)),
    } = {}
  ) => {
    return {
      ...render(<Provider store={store}>{component}</Provider>),
      store,
    };
  };

  let store;
  let component;
  let query;
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

  beforeEach(() => {
    query = {
      site: {
        siteMetadata: {
          title: 'Default Starter',
          description: 'Site description',
          author: 'site author',
        },
      },
    };

    store = mockStore({
      loading: false,
      articles: [],
      error: null,
    });

    store.dispatch = jest.fn();

    component = create(
      <Provider store={store}>
        <Index
          location={{
            search: '?category=5dfccaa7-e8ab-4044-8355-b6bebba95499',
          }}
          data={query}
          menuNav={false}
          userNav={false}
        />
      </Provider>
    );
  });

  beforeEach(() => {
    axios.__setValue({ data });
  });

  afterEach(cleanup);

  it('renders correctly', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('Call dispatch get more articles correctly', () => {
    let instance = component.root;
    const mainContainer = instance.findByProps({
      className: 'container main-container',
    });
    const button = mainContainer.findByType(Button);

    store.clearActions();
    act(() => {
      button.props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  it('renders articles correctly', async () => {
    const { getAllByTestId, getByTestId, getByText } = renderWithRedux(
      <Index
        location={{
          search: '?category=5dfccaa7-e8ab-4044-8355-b6bebba95499',
        }}
        data={data}
        menuNav={false}
        userNav={false}
      />,
      { initialState }
    );
    fireEvent.click(getByText('View more stories'));

    await waitFor(() => getByTestId('article-list'));
    expect(getAllByTestId('article-item').length).toEqual(4);
  });

  it('renders more articles after call view more', async () => {
    const { getAllByTestId, getByTestId, getByText } = renderWithRedux(
      <Index
        location={{
          search: '?category=5dfccaa7-e8ab-4044-8355-b6bebba95499',
        }}
        data={data}
        menuNav={false}
        userNav={false}
      />
    );

    // First click event
    fireEvent.click(getByText('View more stories'));
    await waitFor(() => getByTestId('article-list'));
    // Expect 4 elements
    expect(getAllByTestId('article-item').length).toEqual(4);

    // Second click event
    fireEvent.click(getByText('View more stories'));
    // Expect 8 elements
    await waitFor(() => getByTestId('article-list'));
    expect(getAllByTestId('article-item').length).toEqual(8);
  });

  it('Navigate to other section', async () => {
    const { getAllByTestId, getByTestId, getByText } = renderWithRedux(
      <Index
        location={{
          search: '?category=5dfccaa7-e8ab-4044-8355-b6bebba95499',
        }}
        data={data}
        menuNav={true}
        userNav={true}
      />
    );

    // First click event
    fireEvent.click(getByText('View more stories'));
    await waitFor(() => getByTestId('article-list'));
    // Expect 4 elements
    expect(getAllByTestId('article-item').length).toEqual(4);

    // Second click event
    fireEvent.click(getByText('View more stories'));
    // Expect 8 elements
    await waitFor(() => getByTestId('article-list'));
    expect(getAllByTestId('article-item').length).toEqual(8);

    // Navigate to other section
    const links = getAllByTestId('section-action');

    // Click on navigate on first element
    fireEvent.click(links[0]);
    // try nav while loading = true, (first element)
    fireEvent.click(links[0]);
    // No change articles list while loading
    expect(getByTestId('article-list').children.length).toEqual(8);

    for (let index = 0; index < links.length; index++) {
      const link = links[index];

      fireEvent.click(link);
      const articleList = await waitFor(() => getByTestId('article-list'));

      // Restar to 4 element on each navigate
      expect(articleList.children.length).toEqual(4);
    }
  });

  it('Axios bad response', () => {
    const newData = {
      count: 0,
      error: true,
    };
    axios.__setValue({ data: newData });

    const { getByTestId } = renderWithRedux(
      <Index
        location={{
          search: '?category=5dfccaa7-e8ab-4044-8355-b6bebba95499',
        }}
        data={data}
        menuNav={false}
        userNav={false}
      />,
      { initialState }
    );

    // Count content childs of articles list
    expect(getByTestId('article-list').children.length).toEqual(0);
  });

  it('Contact form on submit with correct data', async () => {
    const { getByTestId, getByText } = renderWithRedux(
      <Index
        location={{
          search: '?category=5dfccaa7-e8ab-4044-8355-b6bebba95499',
        }}
        data={data}
        menuNav={false}
        userNav={false}
      />,
      { initialState }
    );

    // First click event
    fireEvent.change(getByTestId('first-name'), {
      target: { name: 'first_name', value: 'asd' },
    });
    fireEvent.change(getByTestId('last-name'), {
      target: { name: 'last_name', value: 'asd' },
    });
    fireEvent.change(getByTestId('email-input'), {
      target: { name: 'email', value: 'email@test.com' },
    });
    fireEvent.change(getByTestId('phone-input'), {
      target: { name: 'phone', value: '8005555555' },
    });
    fireEvent.change(getByTestId('message-input'), {
      target: { name: 'message', value: 'asd' },
    });
    await waitFor(() => fireEvent.submit(getByTestId('contact-form')));

    // Check modal status
    expect(getByText('Form content')).toBeTruthy();

    const modalBefore = getByTestId('modal-element');
    expect(modalBefore.className).toEqual('eui-modal fade in');

    // Close modal
    fireEvent.click(getByTestId('modal-close-button'));
    // Verify close

    const modalAfter = await waitFor(() => getByTestId('modal-element'));

    expect(modalAfter.className).toEqual('eui-modal fade');
  });
});
