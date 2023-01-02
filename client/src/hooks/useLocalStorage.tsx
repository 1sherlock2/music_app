import { useEffect, useState } from 'react';

export default (key: string, defaulValue: any) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key) || '') || defaulValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};
