import { useEffect, useRef } from 'react';

export default (callback: () => any) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (callback && !didMount.current) {
      didMount.current = true;
      callback();
    }
  });
};
