// @flow
/* global document window:true */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import App from './components/App';
import '@babel/polyfill';
import { fetchPokemonNames } from './actions';


/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const logger = createLogger({
  duration: true,
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk, logger),
    devtoolMiddleware,
  ),
);

store.dispatch(fetchPokemonNames());

const root = document.getElementById('container');
if (root !== null) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root,
  );
}
