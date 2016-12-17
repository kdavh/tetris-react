import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import makeStore from '../store.js';

it('renders without crashing', () => {
  const store = makeStore()
  const div = document.createElement('div');
  ReactDOM.render(<App store={store} />, div);
});
