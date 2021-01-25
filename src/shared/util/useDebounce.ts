import {useEffect, useState} from 'react';

interface Props<T> {
  value: T;
  delay: number;
}

export const useDebounce = <T>({value, delay}: Props<T>): T => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, setDebounced, delay]);

  return debounced;
};
