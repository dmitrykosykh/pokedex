// @flow
/* global document:true */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import App from './components/App';
import '@babel/polyfill';
import { fetchPokemonNames } from './actions';


const store = createStore(
  reducers,
  applyMiddleware(thunk),
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
