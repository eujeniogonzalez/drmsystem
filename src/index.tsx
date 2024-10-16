import './main.scss';
import React from 'react';
import App from './components/app-components/app/app';
import HistoryRouter from './components/app-components/history-router/history-router';
import browserHistory from './services/browser-history';
import Toast from './components/page-components/toast/toast';
import { createRoot } from 'react-dom/client';
import { store } from './store';
import { refreshAuthAction } from './store/api-actions/user-api-actions';
import { Provider } from 'react-redux';

store.dispatch(refreshAuthAction());

const element = document.getElementById('root');
const root = createRoot(element!);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <App />
        <Toast />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);

