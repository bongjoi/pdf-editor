import { useState, useEffect } from 'react';

export const useZoom = (store) => {
  const [scale, setScale] = useState(store.get('scale') || 0);

  const handleScaleChanged = (currentScale) => {
    setScale(currentScale);
  };

  useEffect(() => {
    store.subscribe('scale', handleScaleChanged);

    return () => {
      store.unsubscribe('scale', handleScaleChanged);
    };
  }, []);

  return { scale };
};
