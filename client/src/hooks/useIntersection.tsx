import { useEffect, useState } from 'react';
import canUseDOM from '../utils/canUseDom';
import 'intersection-observer';

const useIntersection = (
  ref: any,
  {
    threshold = 0,
    rootMargin = canUseDOM
      ? `${window.innerHeight / 2}px ${window.innerWidth / 2}px`
      : '0px',
    root,
    defaultInView
  }: any = {}
) => {
  const [inView, setInView] = useState(defaultInView);

  useEffect(() => {
    if (!inView && ref?.current) {
      let didCancel = false;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!didCancel) {
            if (entry.intersectionRatio > 0 || entry.isIntersecting) {
              setInView(true);
              observer.disconnect();
            }
          }
        },
        { threshold, root, rootMargin }
      );

      observer.observe(ref.current);

      return () => {
        didCancel = true;

        observer.disconnect();
      };
    }

    return undefined;
  }, [ref, inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return inView;
};

export default useIntersection;
