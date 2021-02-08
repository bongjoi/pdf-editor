import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import Spinner from '../components/Spinner';
// import { decrease } from '../zoom/zoomingLevel';

const PageSizeCalculatorBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PageSizeCalculator = ({ doc, render }) => {
  const pagesRef = useRef(null);
  const [pageSize, setPageSize] = useState({
    pageWidth: 0,
    pageHeight: 0,
    scale: 1
  });

  useEffect(() => {
    doc.getPage(1).then((pdfPage) => {
      const viewport = pdfPage.getViewport({ scale: 1 });
      const w = viewport.width;
      const h = viewport.height;

      const pagesElement = pagesRef.current;
      if (!pagesElement) return;

      // const scaled = (pagesElement.clientWidth - 2 * 50) / w;
      // const scale = decrease(Math.max(1, scaled));

      setPageSize({
        pageWidth: w,
        pageHeight: h,
        // scale
        scale: 1
      });
    });
  }, [doc]);

  const { pageWidth } = pageSize;

  return pageWidth === 0 ? (
    <PageSizeCalculatorBlock ref={pagesRef}>
      <Spinner />
    </PageSizeCalculatorBlock>
  ) : (
    render(pageSize)
  );
};

export default PageSizeCalculator;
