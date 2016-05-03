import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
// import { applyMiddelware } from 'redux';
// import ReduxPromise form 'redux-promise';

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
//     ],
//   tags: 
//     [
//       {
//         id: 0,
//         name: 'tag1'
//       },
//       {
//         id: 1,
//         name: 'tag2'
//       }
//     ]
// }

// const createStoreWithMiddleware = applyMiddelware(ReduxPromise)(createStore);
// let store = createStoreWithMiddleware(appReducer);
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
