import React from 'react';
import supportRef from './supportRef';

const cloneChildren = (children, newProps) => {
  if (!supportRef(children)) {
    return children;
  }

  return React.cloneElement(children, newProps);
};

export default cloneChildren;
