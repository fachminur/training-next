import { useEffect, useState } from 'react';

export default function useDebounce(value, delay, setPage = {}) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setPage(1);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, setPage]);

  return debouncedValue;
}
