import React from 'react';
import {render} from 'react-dom';
import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import './common/fn';
import {HelmetProvider} from 'react-helmet-async';
import {ThemeProvider} from '@mui/styles';
import {createReduxStore} from './data/core/store';
import theme from './theme';
import {Web3Provider} from './view/components/Wallet';

export default (App, reducers, rootDomContainer = 'root') => {
  const combinedReducers = combineReducers(reducers);
  const store = createReduxStore(combinedReducers);

  const MOUNT_NODE = document.getElementById(rootDomContainer) as HTMLElement;

  const ProvidedApp = () => (
    <Web3Provider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <React.Suspense fallback={<div />}>
            <HelmetProvider>
              <App/>
            </HelmetProvider>
          </React.Suspense>
        </ThemeProvider>
      </Provider>
    </Web3Provider>
  );

  render(<ProvidedApp />, MOUNT_NODE);
};
