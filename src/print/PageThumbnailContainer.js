import { useState, useEffect } from 'react';
import { Spinner } from '../core';
import PageThumbnail from './PageThumbnail';

const PageThumbnailContainer = ({
  doc,
  pageHeight,
  pageIndex,
  pageWidth,
  rotation,
  onLoad
}) => {
  const [pageSize, setPageSize] = useState({
    width: pageWidth,
    height: pageHeight,
    page: null,
    viewportRotation: 0
  });
  const { page, width, height } = pageSize;
  const isVertical = Math.abs(rotation) % 180 === 0;

  useEffect(() => {
    doc
      .getPage(pageIndex + 1)
      .then((pdfPage) => {
        const viewport = pdfPage.getViewport({ scale: 1 });

        setPageSize({
          width: viewport.width,
          height: viewport.height,
          page: pdfPage,
          viewportRotation: viewport.rotation
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const rotationNumber = (rotation + pageSize.viewportRotation) % 360;

  return !page ? (
    <Spinner />
  ) : (
    <PageThumbnail
      page={page}
      pageWidth={isVertical ? width : height}
      pageHeight={isVertical ? height : width}
      rotation={rotationNumber}
      onLoad={onLoad}
    />
  );
};

export default PageThumbnailContainer;
