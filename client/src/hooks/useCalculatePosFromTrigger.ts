import { useCallback, useState } from 'react';
import elementPosition from '../utils/elementPosition';

export default ({
  triggerRef,
  tooltipRef,
  maxWidth,
  fixed,
  paddingFromViewport = 12
}) => {
  const [style, setStyle] = useState({
    element: {
      top: '0px',
      left: '0px'
    }
  });
  const [posClass, setPosClass] = useState('');

  const updatePos = useCallback(() => {
    const {
      top,
      bottom,
      left,
      right,
      elClass: tooltipClass,
      arrowX
    } = elementPosition({
      trigger: triggerRef?.current,
      helper: tooltipRef.current,
      maxWidth,
      fixed,
      paddingFromViewport
    });

    setStyle({
      element: {
        top,
        bottom,
        left,
        right,
        opacity: 1
      },
      arrow: {
        left: arrowX
      }
    });

    setPosClass(tooltipClass);
  }, [triggerRef, tooltipRef, maxWidth, fixed, paddingFromViewport]);

  return {
    updatePos,
    style,
    posClass
  };
};
