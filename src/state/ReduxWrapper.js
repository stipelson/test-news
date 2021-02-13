import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './app';

const createStore = () => reduxCreateStore(reducer, applyMiddleware(thunk));

const ReduxWrapper = ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);

ReduxWrapper.propTypes = {
  element: PropTypes.any,
};

export default ReduxWrapper;
