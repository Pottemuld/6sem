import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combinedReducers } from './redux';


// REDUX SHORTLIST:
// STORE -> the global state

// ACTION -> describes what we can do with/on state, as well as arguments (given as object)
// lidt som en enum der beskriver hvilke handlinger vi kan gøre med vores variable

// REDUCER -> how does actions transform state into next state? checks action, based on action it modifies store
// reducer kan også ses som værende de variabler vi har

// DISPATCH -> execute action, reducer checks what to do, store gets updated
// det vi skal kalde for at modificere vores state - vi dispatcher en bestemt action på en reducer, evt med noget data


const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    // for redux devtools extension in chrome
);


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
