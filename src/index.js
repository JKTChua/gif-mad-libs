import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './reducers';

const store = createStore(
  allReducers,
  {
    phrases: [
      {
        word: 'Test',
        uri: 'test.png',
      },
    ],
  },
  window.devToolsExtension && window.devToolsExtension(),
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
