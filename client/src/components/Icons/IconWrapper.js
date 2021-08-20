import React from 'react';

const IconWrapper = ({ color, size = '1rem', children, ...rest }) =>
  React.cloneElement(children, {
    width: size,
    height: size,
    fill: color,
    ...rest,
  });

export default IconWrapper;
