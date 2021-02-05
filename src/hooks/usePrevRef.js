import { useRef, useEffect } from 'react';

export const usePrevRef = (input) => {
  const ref = useRef(input);

  useEffect(() => {
    ref.current = input;
  }, [input]);

  return ref.current;
};
