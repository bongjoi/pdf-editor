import { useState } from 'react';
import styled from 'styled-components/macro';
import ThumbnailItem from './ThumbnailItem';
import { Spinner } from '../core';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const THUMBNAIL_WIDTH = 100;

const Div = styled.div`
  margin: 0px auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 8px 0px;
`;

const ThumbnailContainer = ({
  doc,
  pageHeight,
  pageIndex,
  pageWidth,
  rotation
}) => {
  const [pageSize, setPageSize] = useState({
    width: pageWidth,
    height: pageHeight,
    isCalculated: false,
    page: null,
    viewportRotation: 0
  });
  const { width, height, isCalculated, page } = pageSize;

  const scale = width / height;
  const isVertical = Math.abs(rotation) % 180 === 0;
  const w = isVertical ? THUMBNAIL_WIDTH : THUMBNAIL_WIDTH / scale;
  const h = isVertical ? THUMBNAIL_WIDTH / scale : THUMBNAIL_WIDTH;

  const onVisibilityChanged = (params) => {
    if (params.isVisible && !isCalculated) {
      doc.getPage(pageIndex + 1).then((pdfPage) => {
        const viewport = pdfPage.getViewport({ scale: 1 });

        setPageSize({
          width: viewport.width,
          height: viewport.height,
          isCalculated: true,
          page: pdfPage,
          viewportRotation: viewport.rotation
        });
      });
    }
  };

  const rotationNumber = (rotation + pageSize.viewportRotation) % 360;

  const containerRef = useIntersectionObserver({
    onVisibilityChanged
  });

  return (
    <Div
      className="editor-thumbnail-container"
      ref={containerRef}
      style={{
        height: `${h}px`,
        width: `${w}px`
      }}
    >
      {!page ? (
        <Spinner />
      ) : (
        <ThumbnailItem
          page={page}
          pageWidth={isVertical ? width : height}
          pageHeight={isVertical ? height : width}
          rotation={rotationNumber}
          thumbnailHeight={h}
          thumbnailWidth={w}
        />
      )}
    </Div>
  );
};

export default ThumbnailContainer;
