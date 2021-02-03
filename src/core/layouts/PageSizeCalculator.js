import React, { useContext, useRef, useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ThemeContext from '../theme/ThemeContext';
import { decrease } from '../zoom/zoomingLevel';

const PageSizeCalculator = ({ doc, render }) => {
  const theme = useContext(ThemeContext);
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

      const scaled = (pagesElement.clientWidth - 2 * 50) / w;
      const scale = decrease(Math.max(1, scaled));

      setPageSize({
        pageWidth: w,
        pageHeight: h,
        scale
      });
    });
  }, [doc]);

  const { pageWidth } = pageSize;

  return pageWidth === 0 ? (
    <div className={`${theme.prefixClass}-page-size-calculator`} ref={pagesRef}>
      <Spinner />
    </div>
  ) : (
    render(pageSize)
  );
};

export default PageSizeCalculator;
