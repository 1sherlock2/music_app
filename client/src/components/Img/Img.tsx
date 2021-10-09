import React, { useState, useRef, forwardRef } from 'react';
import useIntersection from '../../hooks/useIntersection';
import PropTypes from 'prop-types';

const Img = ({
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

Img.propTypes = {
  src: PropTypes.string,
  altSrc: PropTypes.string,
  alt: PropTypes.string,
  lazy: PropTypes.bool,
  loadImage: PropTypes.func,
  errorImage: PropTypes.func,
  offset: PropTypes.number,
  intersectionRootMargin: PropTypes.string
};

export default Img;
