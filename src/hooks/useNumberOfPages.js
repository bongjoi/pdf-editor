import { useState, useEffect } from 'react';

export const useNumberOfPages = (store) => {
  const [numberOfPages, setNumberOfPages] = useState(
    store.get('numberOfPages') || 0
  );

  const handleNumberOfPages = (total) => {
    setNumberOfPages(total);
  };

  useEffect(() => {
    store.subscribe('numberOfPages', handleNumberOfPages);

    return () => {
      store.unsubscribe('numberOfPages', handleNumberOfPages);
    };
  }, []);

  return { numberOfPages };
};
