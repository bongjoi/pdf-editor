import React, { useContext, useState, useRef, useEffect } from 'react';
import styled from 'styled-components/macro';
import CanvasLayer from './CanvasLayer';
import SvgLayer from './SvgLayer';
import TextLayer from './TextLayer';
import Spinner from '../components/Spinner';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import ThemeContext from '../theme/ThemeContext';
import classNames from '../utils/classNames';

const NUMBER_OF_OVERSCAN_PAGES = 2;

const Div = styled.div`
  margin: 0px auto;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &.editor-page-layer-selected {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const PageLayer = ({
  currentPage,
  doc,
  height,
  pageIndex,
  plugins,
  renderPage,
  rotation,
  scale,
  width,
  onPageVisibilityChanged
}) => {
  const theme = useContext(ThemeContext);
  const [pageSize, setPageSize] = useState({
    page: null,
    pageHeight: height,
    pageWidth: width,
    viewportRotation: 0
  });

  const { page, pageHeight, pageWidth } = pageSize;

  const prevIsCalculated = useRef(false);

  const intersectionThreshold = Array(10)
    .fill(null)
    .map((_, i) => i / 10);

  const scaledWidth = pageWidth * scale;
  const scaledHeight = pageHeight * scale;

  const isVertical = Math.abs(rotation) % 180 === 0;
  const w = isVertical ? scaledWidth : scaledHeight;
  const h = isVertical ? scaledHeight : scaledWidth;

  const determinePageSize = () => {
    if (prevIsCalculated.current) {
      return;
    }
    prevIsCalculated.current = true;

    doc
      .getPage(pageIndex + 1)
      .then((pdfPage) => {
        const viewport = pdfPage.getViewport({ scale: 1 });

        setPageSize({
          page: pdfPage,
          pageHeight: viewport.height,
          pageWidth: viewport.width,
          viewportRotation: viewport.rotation
        });
      })
      .catch((err) => console.log(err));
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
    <Div
      ref={containerRef}
      className={classNames({
        [`${theme.prefixClass}-page-layer`]: true,
        [`${theme.prefixClass}-page-layer-selected`]: currentPage === pageIndex
      })}
      data-testid={`viewer-page-layer-${pageIndex}`}
      style={{
        width: `${w}px`,
        height: `${h}px`
      }}
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
                  height={h}
                  page={page}
                  pageIndex={pageIndex}
                  plugins={plugins}
                  rotation={rotationNumber}
                  scale={scale}
                  width={w}
                />
              )
            },
            doc,
            height: h,
            pageIndex,
            rotation,
            scale,
            svgLayer: {
              attrs: {},
              children: (
                <SvgLayer
                  height={h}
                  page={page}
                  rotation={rotationNumber}
                  scale={scale}
                  width={w}
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
            width: w
          })}
          {plugins.map((plugin, idx) =>
            plugin.renderPageLayer ? (
              <React.Fragment key={idx}>
                {plugin.renderPageLayer({
                  doc,
                  height: h,
                  pageIndex,
                  rotation,
                  scale,
                  width: w
                })}
              </React.Fragment>
            ) : (
              <React.Fragment key={idx}></React.Fragment>
            )
          )}
        </>
      )}
    </Div>
  );
};

export default PageLayer;
