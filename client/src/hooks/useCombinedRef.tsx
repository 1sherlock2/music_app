import { useCallback } from 'react';

const useCombinedRef = (...refs: any[]) =>
  useCallback((node) => {
    refs
      .filter((ref) => ref)
      .forEach((ref) => {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          ref.current = node;
        }
      });
  }, refs); // eslint-disable-line react-hooks/exhaustive-deps

export default useCombinedRef;
