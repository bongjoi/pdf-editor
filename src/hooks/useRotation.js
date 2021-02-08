import { useState, useEffect } from 'react';

export const useRotation = (store) => {
  const [rotation, setRotation] = useState(store.get('rotation') || 0);

  const handleRotationChanged = (currentRotation) => {
    setRotation(currentRotation);
  };

  useEffect(() => {
    store.subscribe('rotation', handleRotationChanged);

    return () => {
      store.unsubscribe('rotation', handleRotationChanged);
    };
  }, []);

  return { rotation };
};
