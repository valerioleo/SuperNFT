// import React from 'react';
import {render} from 'react-dom';
import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import './common/fn';
// import {HelmetProvider} from 'react-helmet-async';
import {CssBaseline} from '@mui/material';
import {ThemeProvider} from '@mui/styles';
import {createReduxStore} from './data/core/store';
import theme from './theme';
import {Web3Provider} from './view/components/Wallet';

export default (App, reducers, rootDomContainer = 'root') => {
  const combinedReducers = combineReducers(reducers);
  const store = createReduxStore(combinedReducers);

  const MOUNT_NODE = document.getElementById(rootDomContainer) as HTMLElement;

  const ProvidedApp = () => (
    <div style={{background: 'black', height: '100vh'}}>
      <Web3Provider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
          </ThemeProvider>
        </Provider>
      </Web3Provider>
    </div>
  );

  render(<ProvidedApp />, MOUNT_NODE);
};
