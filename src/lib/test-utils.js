import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { initialState as reducerInitialState } from '../state/app';
import thunk from 'redux-thunk';
import rootReducer from '../state/reducer';

function render(
  ui,
  {
    initialState = reducerInitialState,
    store = createStore(
      rootReducer,
      { app: initialState },
      applyMiddleware(thunk)
    ),
    ...renderOptions
  } = {}
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
