import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './api/store';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/HomePage.css';
import './styles/SignIn.css';
import './styles/Common.css';
import './styles/MarketingSales.css';
import './styles/Me.css';
import '../node_modules/green-audio-player/dist/css/green-audio-player.min.css'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
    <App />
  </React.StrictMode></Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
