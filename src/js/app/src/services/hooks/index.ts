import {useEffect, useRef} from 'react';

export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const useUpdate = (fn, inputs) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if(didMountRef.current) {
      fn();
    }
    else {
      didMountRef.current = true;
    }
  }, inputs);
};

