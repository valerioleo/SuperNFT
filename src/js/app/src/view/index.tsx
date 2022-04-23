/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import {Helmet} from 'react-helmet-async';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import {HomePage} from './pages/HomePage/Loadable';

export function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate='%s - minepunks' defaultTitle='minepunks'>
        <meta name='description' content='A minepunks application' />
      </Helmet>

      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}
