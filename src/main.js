import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import rootReducer from './reducers/rootReducer';

const config = {
  apiKey: 'AIzaSyDoJweuW3Il-GfARqN9kKawLgM0jibHo5U',
  authDomain: 'icopter-52b7a.firebaseapp.com',
  databaseURL: 'https://icopter-52b7a.firebaseio.com',
  projectId: 'icopter-52b7a',
  storageBucket: '',
  messagingSenderId: '974818361661',
};
firebase.initializeApp(config);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
