import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import ThumbnailList from './ThumbnailList';
import { Spinner } from '../core';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ThumbnailListWithStore = ({ store }) => {
  const [currentDoc, setCurrentDoc] = useState(store.get('doc'));
  const [currentPage, setCurrentPage] = useState(store.get('currentPage') || 0);
  const [pageHeight, setPageHeight] = useState(store.get('pageHeight') || 0);
  const [pageWidth, setPageWidth] = useState(store.get('pageWidth') || 0);
  const [rotation, setRotation] = useState(store.get('rotation') || 0);

  const handleCurrentPageChanged = (currentPageIndex) => {
    setCurrentPage(currentPageIndex);
  };

  const handleDocumentChanged = (doc) => {
    setCurrentDoc(doc);
  };

  const handlePageHeightChanged = (height) => {
    setPageHeight(height);
  };

  const handlePageWidthChanged = (width) => {
    setPageWidth(width);
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
    store.subscribe('pageHeight', handlePageHeightChanged);
    store.subscribe('pageWidth', handlePageWidthChanged);
    store.subscribe('rotation', handleRotationChanged);

    return () => {
      store.unsubscribe('doc', handleDocumentChanged);
      store.unsubscribe('pageHeight', handlePageHeightChanged);
      store.unsubscribe('pageWidth', handlePageWidthChanged);
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
      pageHeight={pageHeight}
      pageWidth={pageWidth}
      rotation={rotation}
      onJumpToPage={jump}
    />
  ) : (
    <Div className="editor-thumbnail-list-loader">
      <Spinner />
    </Div>
  );
};

export default ThumbnailListWithStore;
