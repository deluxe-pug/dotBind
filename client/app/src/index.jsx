import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import appReducer from './reducers/appReducer';
import App from './components/App';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
let store = createStoreWithMiddleware(appReducer);
// let store = createStore(appReducer, applyMiddleware(ReduxPromise));

// console.log('store: ', store);
// console.log('initial state: ', store.getState());
// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
