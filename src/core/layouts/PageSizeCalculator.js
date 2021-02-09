import { useContext, useRef, useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ThemeContext from '../theme/ThemeContext';
import { decrease } from '../zoom/zoomingLevel';

const PageSizeCalculator = ({ doc, render }) => {
  const theme = useContext(ThemeContext);
  const pagesRef = useRef();
  const [pageSize, setPageSize] = useState({
    pageHeight: 0,
    pageWidth: 0,
    scale: 1
  });

  useEffect(() => {
    doc.getPage(1).then((pdfPage) => {
      const viewport = pdfPage.getViewport({ scale: 1 });
      const w = viewport.width;
      const h = viewport.height;

      const pagesEle = pagesRef.current;
      if (!pagesEle) {
        return;
      }

      const scaled = (pagesEle.clientWidth - 2 * 50) / w;
      const scale = decrease(Math.max(1, scaled));

      setPageSize({
        pageHeight: h,
        pageWidth: w,
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
