import React, { useState, useRef, forwardRef } from 'react';
import useIntersection from '../../hooks/useIntersection';
import PropTypes from 'prop-types';
import { ImgProps } from './Img.interface';

const Img: React.FC<ImgProps> = ({
  src,
  alt = '',
  lazy,
  altSrc,
  loadImage,
  errorImage,
  offset,
  intersectionRootMargin,
  ...restProps
}: any) => {
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef(null);
  const inView = useIntersection(imageRef, {
    rootMargin: intersectionRootMargin,
    defaultInView: !lazy
  });

  const onLoad = () => {
    loadImage && loadImage(imageRef.current);
  };

  const onError = () => {
    altSrc && setHasError(true);
    errorImage && errorImage(imageRef.current);
  };

  const isAlt = (!src || hasError) && altSrc;

  return (
    <img
      style={{ visibility: inView ? 'visible' : 'hidden' }}
      ref={imageRef}
      src={inView ? (isAlt ? altSrc : src) : null}
      alt={inView ? alt : ''}
      onLoad={onLoad}
      onError={onError}
      {...restProps}
    />
  );
};

export default Img;
