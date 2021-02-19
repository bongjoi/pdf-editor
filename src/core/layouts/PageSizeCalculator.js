import { useContext, useRef, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import Spinner from '../components/Spinner';
import ThemeContext from '../theme/ThemeContext';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PageSizeCalculator = ({ doc, render }) => {
  const theme = useContext(ThemeContext);
  const pagesRef = useRef(null);
  const [pageSize, setPageSize] = useState({
    pageWidth: 0,
    pageHeight: 0,
    scale: 1
  });

  useEffect(() => {
    doc
      .getPage(1)
      .then((pdfPage) => {
        const viewport = pdfPage.getViewport({ scale: 1 });
        const w = viewport.width;
        const h = viewport.height;

        const pagesEle = pagesRef.current;
        if (!pagesEle) {
          return;
        }

        setPageSize({
          pageWidth: w,
          pageHeight: h,
          scale: 1
        });
      })
      .catch((err) => console.log(err));
  }, [doc]);

  const { pageWidth } = pageSize;
  return pageWidth === 0 ? (
    <Div className={`${theme.prefixClass}-page-size-calculator`} ref={pagesRef}>
      <Spinner />
    </Div>
  ) : (
    render(pageSize)
  );
};

export default PageSizeCalculator;
