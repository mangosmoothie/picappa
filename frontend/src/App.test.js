import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { INITIAL_STATE } from './picturedisplay/reducers/mediaitems'

const mockStore = configureMockStore()

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = mockStore({ tags: {}, pictures: {}, controls: {},
    mediaitems: INITIAL_STATE})
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , div);
});
