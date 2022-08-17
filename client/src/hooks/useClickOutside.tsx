import React from 'react';
import { useCallback, useEffect, useState } from 'react';

const useClickOutside = (
  onClickOutside: () => void,
  useCapture: boolean = true,
  eventType: string = 'click'
) => {
  const [refsInside, setRefsInside] = useState([]);

  const setRef = useCallback((node) => {
    if (node) setRefsInside((refs) => [...refs, node]);
  }, []);

  useEffect(() => {
    const isOutsideContainer = (target: any) => {
      const refs: any[] = Object.values(refsInside);
      const someRefExists = refs.some(Boolean);
      const isOutside = !refs.some((item) => item?.contains(target));
      return someRefExists && isOutside;
    };
    const handleClickOutside = (e: any) => {
      isOutsideContainer(e.target) && onClickOutside(e);
    };

    document.addEventListener(eventType, handleClickOutside, useCapture);

    return () =>
      document.removeEventListener(eventType, handleClickOutside, useCapture);
  }, [refsInside, onClickOutside, useCapture, eventType]);

  return setRef;
};

export default useClickOutside;
