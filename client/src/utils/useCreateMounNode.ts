import { useEffect } from 'react';

const useCreateMountNode = (mountId: string) => {
  useEffect(() => {
    if (!document.getElementById(mountId)) {
      const node = document.createElement('div');
      node.setAttribute('id', mountId);
      document.body.appendChild(node);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useCreateMountNode;
