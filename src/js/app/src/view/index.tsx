/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import {Helmet} from 'react-helmet-async';
import {HomePage} from './pages/HomePage/Loadable';

export function App() {
  return (
    <>
      <Helmet titleTemplate='%s - superNFT' defaultTitle='superNFT'>
        <meta name='description' content='A Superfluid application' />
      </Helmet>

      <HomePage />
    </>
  );
}
