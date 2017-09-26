import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import App from './App';
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = mockStore({ tags: [], pictures: {}})
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , div);
});
