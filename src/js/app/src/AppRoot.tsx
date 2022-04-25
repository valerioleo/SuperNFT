import {render} from 'react-dom';
import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {CssBaseline} from '@mui/material';
import {ThemeProvider} from '@mui/styles';
import {createReduxStore} from './data/core/store';
import theme from './theme';
import {Web3Provider} from './view/components/Wallet';
import './common/fn';

export default (App, reducers, rootDomContainer = 'root') => {
  const combinedReducers = combineReducers(reducers);
  const store = createReduxStore(combinedReducers);

  const MOUNT_NODE = document.getElementById(rootDomContainer) as HTMLElement;

  const ProvidedApp = () => (
    <div style={{
      background: 'black',
      height: '100%',
      minHeight: '100vh',
      paddingBottom: '100px'
    }}>
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
