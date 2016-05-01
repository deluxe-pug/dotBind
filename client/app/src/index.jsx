import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import appReducer from './reducers/appReducer';
import App from './components/App';

console.log('in index.jsx');
const dummyData = {
  user: 'connie',
  cards:
    [
      {
        id: 0,
        link: 'www.google.com',
        tags: ['google', 'search']
      },
      {
        id: 1,
        link: 'www.facebook.com',
        tags: ['facebook', 'search']
      }
    ]
}

let store = createStore(appReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
