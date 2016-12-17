import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';

export default function makeStore() {
  return createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
  );
}
