import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './containers/App';
import { reAuthUser } from './actions/auth';
import './style.scss';


const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
if (token && userId) {
  store.dispatch(reAuthUser(token, userId));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('main'),
);
