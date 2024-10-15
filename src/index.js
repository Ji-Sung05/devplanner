import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/scss/style.scss';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </CookiesProvider>
  </Provider>
);
