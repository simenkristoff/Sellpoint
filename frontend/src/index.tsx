import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/nb_NO';
import configureStore from '@/state';

import 'antd/dist/antd.css';
import '@sass/styles.scss';

import { App } from '@/App';

const initialState = (window as any).initialReduxState;
const store = configureStore(initialState);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConfigProvider locale={locale}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
