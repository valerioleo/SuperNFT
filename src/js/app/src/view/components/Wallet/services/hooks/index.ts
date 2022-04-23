import {useState, useEffect} from 'react';
import {injected} from '../connectors';
import useWeb3React from './useWeb3React';

// eslint-disable-next-line import/prefer-default-export
export const useEagerConnect = () => {
  const {activate, active} = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then(isAuthorized => {
      if(isAuthorized) {
        activate(injected);
        setTried(true);
      }
      else {
        setTried(true);
      }
    });
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if(!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};
