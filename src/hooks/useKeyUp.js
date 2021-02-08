import { useEffect } from 'react';

export const useKeyUp = (targetKeyCode, handler) => {
  const keyUpHandler = (event) => {
    event.keyCode === targetKeyCode && handler();
  };

  useEffect(() => {
    document.addEventListener('keyup', keyUpHandler);
    return () => {
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, []);
};
