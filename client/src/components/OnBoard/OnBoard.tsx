import React, { useCallback, useEffect, useRef, useState } from 'react';
import useCalculatePosFromTrigger from '../../hooks/useCalculatePosFromTrigger';
import throttle from '../../utils/throttle';

const OnBoard = ({ name, triggerRef, maxWidth = 300, onClose, children }) => {
  const [show, setShow] = useState(false);
  const tooltipRef = useRef(null);

  const { updatePos, style, posClass } = useCalculatePosFromTrigger({
    triggerRef,
    tooltipRef,
    maxWidth
  });
  console.log({ style });
  console.log({ posClass });
  const setInLocalStorage = useCallback(
    (): void => localStorage.setItem(name, Date.now()),
    [name]
  );

  const onClickClose = () => {
    setShow(false);
    setInLocalStorage();
    onClose?.();
  };

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    show && updatePos();
  }, [show, updatePos]);

  useEffect(() => {
    if (!show) {
      return undefined;
    }

    const throttleUpdatePos = throttle(updatePos);

    // ResizeObserver не поддерживается старыми браузерами
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', throttleUpdatePos);

      return () => {
        window.removeEventListener('resize', throttleUpdatePos);
      };
    }

    const resizeObserver = new ResizeObserver(throttleUpdatePos);

    resizeObserver.observe(document.documentElement);

    return () => {
      resizeObserver.unobserve(document.documentElement);
    };
  }, [show, updatePos]);

  return children;
};

export default OnBoard;
