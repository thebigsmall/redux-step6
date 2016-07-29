import React from 'react';
import {render} from 'react-dom';

import {createStore} from 'redux';
import {Provider} from 'react-redux';



import App from './containers/App';
import todoApp from './reducers';



let store = createStore(todoApp);
let rootElement = document.getElementById('root');

//NOTE warning.js?85a7:45Warning: React.render is deprecated. Please use ReactDOM.render from require('react-dom') instead.
//React.render(
render(
  <Provider store = {store}>
    <App />

  </Provider>,
  document.getElementById('root')
)
