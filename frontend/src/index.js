import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers'
import { fetchTags } from './picturedisplay/actions/tags'
import { fetchPics } from './picturedisplay/actions/pictures'
import { fetchMediaSelections } from './picturedisplay/actions/mediaitems'
import { Map } from 'immutable'

const loggerMiddleware = createLogger()
const INITIAL_STATE = Map()

let store = createStore(
  reducers,
  INITIAL_STATE,
  applyMiddleware(thunk)
)

store.dispatch(fetchTags())
store.dispatch(fetchPics())
store.dispatch(fetchMediaSelections())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
