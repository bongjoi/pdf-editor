import { useEffect } from 'react';

export const useClickOutside = (
  closeOnClickOutside,
  targetRef,
  onClickOutside
) => {
  const clickHandler = (event) => {
    const target = targetRef.current;
    if (target && !target.contains(event.target)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    if (!closeOnClickOutside) {
      return;
    }

    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, []);
};
