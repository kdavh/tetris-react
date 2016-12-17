import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import makeStore from './store.js';
import './index.css';

const store = makeStore()

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
