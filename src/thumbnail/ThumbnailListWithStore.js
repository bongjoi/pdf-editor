import { useState, useEffect } from 'react';
import ThumbnailList from './ThumbnailList';
import { Spinner } from '../core';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';

const ThumbnailListWithStore = ({ store }) => {
  const [currentDoc, setCurrentDoc] = useState(store.get('doc'));
  const [currentPage, setCurrentPage] = useState(store.get('currentPage') || 0);
  const [pageWidth, setPageWidth] = useState(store.get('pageWidth') || 0);
  const [pageHeight, setPageHeight] = useState(store.get('pageHeight') || 0);
  const [rotation, setRotation] = useState(store.get('rotation') || 0);

  const handleCurrentPageChanged = (currentPageIndex) => {
    setCurrentPage(currentPageIndex);
  };

  const handleDocumentChanged = (doc) => {
    setCurrentDoc(doc);
  };

  const handlePageWidthChanged = (width) => {
    setPageWidth(width);
  };

  const handlePageHeightChanged = (height) => {
    setPageHeight(height);
  };

  const handleRotationChanged = (currentRotation) => {
    setRotation(currentRotation);
  };

  const jump = (pageIndex) => {
    const jumpToPage = store.get('jumpToPage');
    if (jumpToPage) {
      jumpToPage(pageIndex);
    }
  };

  useEffect(() => {
    store.subscribe('doc', handleDocumentChanged);
    store.subscribe('pageWidth', handlePageWidthChanged);
    store.subscribe('pageHeight', handlePageHeightChanged);
    store.subscribe('rotation', handleRotationChanged);

    return () => {
      store.unsubscribe('doc', handleDocumentChanged);
      store.unsubscribe('pageWidth', handlePageWidthChanged);
      store.unsubscribe('pageHeight', handlePageHeightChanged);
      store.unsubscribe('rotation', handleRotationChanged);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    store.subscribe('currentPage', handleCurrentPageChanged);

    return () => {
      store.unsubscribe('currentPage', handleCurrentPageChanged);
    };
  }, []);

  return currentDoc ? (
    <ThumbnailList
      currentPage={currentPage}
      doc={currentDoc}
      pageWidth={pageWidth}
      pageHeight={pageHeight}
      rotation={rotation}
      onJumpToPage={jump}
    />
  ) : (
    <div className="pdf-editor-thumbnail-list-loader">
      <Spinner />
    </div>
  );
};

export default ThumbnailListWithStore;
