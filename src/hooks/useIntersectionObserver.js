import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useIntersectionObserver = (props) => {
  const containerRef = useRef(null);

  const { threshold, onVisibilityChanged } = props;

  useIsomorphicLayoutEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;
          const ratio = entry.intersectionRatio;
          onVisibilityChanged({ isVisible, ratio });
        });
      },
      {
        threshold: threshold || 0
      }
    );
    const container = containerRef.current;
    if (!container) {
      return;
    }
    io.observe(container);

    return () => {
      io.unobserve(container);
    };
  }, []);

  return containerRef;
};
