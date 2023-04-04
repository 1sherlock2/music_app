import { isMemo } from 'react-is';

// https://github.com/react-component/util/blob/master/src/ref.ts

const supportRef = (nodeOrComponent) => {
  const type = isMemo(nodeOrComponent)
    ? nodeOrComponent.type.type
    : nodeOrComponent.type;

  // Function component
  if (typeof type === 'function' && !type.prototype?.render) {
    return false;
  }

  // Class component
  if (
    typeof nodeOrComponent === 'function' &&
    !nodeOrComponent.prototype?.render
  ) {
    return false;
  }

  return true;
};

export default supportRef;
