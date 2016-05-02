import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import appReducer from './reducers/appReducer';
import App from './components/App';

console.log('in index.jsx');



let store = createStore(appReducer);

console.log('get state: ', store.getState());

ReactDOM.render(
  <App state={store.getState().cardsReducer}/>,
  document.getElementById('app')
);



// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('app')
// );

// export default dummyData;
