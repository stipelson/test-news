import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const createStore = () => reduxCreateStore(rootReducer, applyMiddleware(thunk));

const ReduxWrapper = ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);

ReduxWrapper.propTypes = {
  element: PropTypes.any,
};

export default ReduxWrapper;
