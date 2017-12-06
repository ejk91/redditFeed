import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store.js';

import App from './components/App.jsx';

const store = configureStore();

const Index = () => ( 
  <Provider store = {store}>
    <App />
  </Provider>
);

const app = document.getElementById('app');

render(<Index />, app);