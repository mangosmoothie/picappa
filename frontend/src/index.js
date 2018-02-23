import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker'
import reducers from './reducers'
import { requestTags } from './picturedisplay/actions/tags'
import { requestPics } from './picturedisplay/actions/pictures'
import { requestMediaSelections } from './picturedisplay/actions/mediaitems'
import createSagaMiddleware from 'redux-saga'
import demo from './demo'
import { watchRequestTags } from './picturedisplay/sagas/tags'
import { watchRequestPics } from './picturedisplay/sagas/pictures'
import { watchRequestSelections } from './picturedisplay/sagas/mediaitems'

const loggerMiddleware = createLogger()
const INITIAL_STATE = {}

const sagaMiddleware = createSagaMiddleware()

let store = createStore(
  reducers,
  INITIAL_STATE,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(watchRequestTags)
sagaMiddleware.run(watchRequestPics)
sagaMiddleware.run(watchRequestSelections)

if(process.env.REACT_APP_DEMO === 'TRUE') demo()
store.dispatch(requestTags())
store.dispatch(requestPics())
store.dispatch(requestMediaSelections())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
