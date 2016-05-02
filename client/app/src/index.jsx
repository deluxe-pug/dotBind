import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';

import appReducer from './reducers/appReducer';
import App from './components/App';

// const dummyData = {
//   user: 'connie',
//   cards:
//     [
//       {
//         id: 0,
//         link: 'www.google.com'
//       },
//       {
//         id: 1,
//         link: 'www.facebook.com'
//       }
//     ]
// }

let store = createStore(appReducer);

console.log('store: ', store);
console.log('initial state: ', store.getState());

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
