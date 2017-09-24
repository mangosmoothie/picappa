import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers'
import axios from 'axios'
import { addTag } from './picturedisplay/actions/tags'

let store = createStore(reducers)

axios.get('/api/all-tags')
  .then( ({data}) => {
    data['tags'].map(t => store.dispatch(addTag(t)))
  })
  .catch( (err) => console.error(err) );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
