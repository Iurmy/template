import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './containers'
import './index.css';
import App from './App';
import rootSaga from './sagas'
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker';

const { persistor, store } = configureStore({})

store.runSaga(rootSaga)

ReactDOM.render(
  <Root store={store} persistor={persistor} />,
  document.getElementById('root')
)
registerServiceWorker();
