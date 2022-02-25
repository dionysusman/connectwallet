import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import store from './redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './assets/css/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
  <Provider store={store}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
