import { useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useCurrentPage = (store) => {
  const [currentPage, setCurrentPage] = useState(store.get('currentPage') || 0);

  const handleCurrentPageChanged = (currentPageIndex) => {
    setCurrentPage(currentPageIndex);
  };

  useIsomorphicLayoutEffect(() => {
    store.subscribe('currentPage', handleCurrentPageChanged);

    return () => {
      store.unsubscribe('currentPage', handleCurrentPageChanged);
    };
  }, []);

  return { currentPage };
};
