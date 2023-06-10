import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './assets/css/theme.sass';
import { BrowserRouter } from "react-router-dom";

const store = createStore(combineReducers({
}));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App  />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);