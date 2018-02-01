import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Map } from 'immutable'
import App from './App';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { INITIAL_STATE } from './picturedisplay/reducers/mediaitems'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = mockStore({ tags: Map(), pictures: Map(), controls: Map(),
    mediaitems: INITIAL_STATE})
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , div);
});
