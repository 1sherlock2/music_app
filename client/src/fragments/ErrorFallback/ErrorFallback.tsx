import React from 'react';
import s from './ErrorFallback.scss';
import Button from '../../components/Button/Button';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className={s.error}>
      <h1>Something went wrong</h1>
      <div className={s.error_message}>Error: {error.message}</div>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
