import React, { useContext, useRef, useEffect, useState } from 'react';
import ThemeContext from '../theme/ThemeContext';
import Spinner from '../components/Spinner';
import CanvasLayer from './CanvasLayer';
import SvgLayer from './SvgLayer';
import TextLayer from './TextLayer';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const NUMBER_OF_OVERSCAN_PAGES = 2;

const PageLayer = ({
  currentPage,
  doc,
  width,
  height,
  pageIndex,
  plugins,
  renderPage,
  rotation,
  scale,
  onPageVisibilityChanged
}) => {
  const theme = useContext(ThemeContext);
  const [pageSize, setPageSize] = useState({
    page: null,
    pageWidth: width,
    pageHeight: height,
    viewportRotation: 0
  });

  const { page, pageWidth, pageHeight } = pageSize;

  const prevIsCalculated = useRef(false);

  const intersectionThreshold = Array(10)
    .fill(null)
    .map((_, i) => i / 10);

  const scaledWidth = pageWidth * scale;
  const scaledHeight = pageHeight * scale;

  const isVertical = Math.abs(rotation) % 100 === 0;
  const w = isVertical ? scaledWidth : scaledHeight;
  const h = isVertical ? scaledHeight : scaledWidth;

  const determinePageSize = () => {
    if (prevIsCalculated.current) return;

    prevIsCalculated.current = true;

    doc.getPage(pageIndex + 1).then((pdfPage) => {
      const viewport = pdfPage.getViewport({ scale: 1 });

      setPageSize({
        page: pdfPage,
        pageWidth: viewport.width,
        pageHeight: viewport.height,
        viewportRotation: viewport.rotation
      });
    });
  };

  const visibilityChanged = (params) => {
    onPageVisibilityChanged(pageIndex, params.isVisible ? params.ratio : -1);
    if (params.isVisible) {
      determinePageSize();
    }
  };

  const defaultPageRenderer = (props) => (
    <>
      {props.canvasLayer.children}
      {props.textLayer.children}
    </>
  );
  const renderPageLayer = renderPage || defaultPageRenderer;

  const rotationNumber = (rotation + pageSize.viewportRotation) % 360;

  const containerRef = useIntersectionObserver({
    threshold: intersectionThreshold,
    onVisibilityChanged: visibilityChanged
  });

  useEffect(() => {
    if (
      currentPage - NUMBER_OF_OVERSCAN_PAGES <= pageIndex &&
      pageIndex <= currentPage + NUMBER_OF_OVERSCAN_PAGES
    ) {
      determinePageSize();
    }
  }, [currentPage]);

  return (
    <div
      ref={containerRef}
      className={`${theme.prefixClass}-page-layer`}
      style={{ width: `${w}px`, height: `${h}px` }}
    >
      {!page ? (
        <Spinner />
      ) : (
        <>
          {renderPageLayer({
            canvasLayer: {
              attrs: {},
              children: (
                <CanvasLayer
                  width={w}
                  height={h}
                  page={page}
                  pageIndex={pageIndex}
                  plugins={plugins}
                  rotation={rotationNumber}
                  scale={scale}
                />
              )
            },
            svgLayer: {
              attrs: {},
              children: (
                <SvgLayer
                  width={w}
                  height={h}
                  page={page}
                  rotation={rotationNumber}
                  scale={scale}
                />
              )
            },
            textLayer: {
              attrs: {},
              children: (
                <TextLayer
                  page={page}
                  pageIndex={pageIndex}
                  plugins={plugins}
                  rotation={rotationNumber}
                  scale={scale}
                />
              )
            },
            doc,
            width: w,
            height: h,
            pageIndex,
            rotation,
            scale
          })}
          {plugins.map((plugin, idx) =>
            plugin.renderPageLayer ? (
              <React.Fragment key={idx}>
                {plugin.renderPageLayer({
                  doc,
                  width: w,
                  height: h,
                  pageIndex,
                  rotation,
                  scale
                })}
              </React.Fragment>
            ) : (
              <React.Fragment key={idx}></React.Fragment>
            )
          )}
        </>
      )}
    </div>
  );
};

export default PageLayer;
