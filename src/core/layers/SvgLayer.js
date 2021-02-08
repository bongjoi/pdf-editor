import React, { useContext, createRef } from 'react';
import WithScale from './WithScale';
import PdfJs from '../vendors/PdfJs';
import ThemeContext from '../theme/ThemeContext';

const SvgLayer = ({ width, height, page, rotation, scale }) => {
  const theme = useContext(ThemeContext);
  const containerRef = createRef();

  const empty = () => {
    const containerElement = containerRef.current;
    if (!containerElement) return;
    containerElement.innerHTML = '';
  };

  const renderSvg = () => {
    const containerElement = containerRef.current;
    const viewport = page.getViewport({ rotation, scale });

    page.getOperatorList().then((operatorList) => {
      empty();
      const graphic = new PdfJs.SVGGraphics(page.commonObjs, page.objs);
      graphic.getSVG(operatorList, viewport).then((svg) => {
        svg.style.width = `${width}px`;
        svg.style.height = `${height}px`;

        containerElement.appendChild(svg);
      });
    });
  };

  return (
    <WithScale callback={renderSvg} rotation={rotation} scale={scale}>
      <div className={`${theme.prefixClass}-svg-layer`} ref={containerRef} />
    </WithScale>
  );
};

export default SvgLayer;
