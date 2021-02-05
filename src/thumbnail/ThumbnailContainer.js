import React, { useState } from 'react';
import ThumbnailItem from './ThumbnailItem';
import { Spinner } from '../core';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const THUMBNAIL_WIDTH = 100;

const ThumbnailContainer = ({
  doc,
  pageWidth,
  pageHeight,
  pageIndex,
  rotation
}) => {
  const [pageSize, setPageSize] = useState({
    width: pageWidth,
    height: pageHeight,
    page: null,
    isCalculated: false,
    viewportRotation: 0
  });
  const { isCalculated, page, width, height } = pageSize;

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
          page: pdfPage,
          isCalculated: true,
          viewportRotation: viewport.rotation
        });
      });
    }
  };

  const rotationNumber = (rotation + pageSize.viewportRotation) % 360;

  const containerRef = useIntersectionObserver({ onVisibilityChanged });

  return (
    <div
      className="pdf-editor-thumbnail-container"
      ref={containerRef}
      style={{ width: `${w}px`, height: `${h}px` }}
    >
      {!page ? (
        <Spinner />
      ) : (
        <ThumbnailItem
          page={page}
          pageWidth={isVertical ? width : height}
          pageHeight={isVertical ? height : width}
          rotation={rotationNumber}
          thumbnailWidth={w}
          thumbnailHeigiht={h}
        />
      )}
    </div>
  );
};

export default ThumbnailContainer;
