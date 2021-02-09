import { useContext, createRef } from 'react';
import WithScale from './WithScale';
import ThemeContext from '../theme/ThemeContext';
import PdfJs from '../vendors/PdfJs';

const SvgLayer = ({ height, page, rotation, scale, width }) => {
  const theme = useContext(ThemeContext);
  const containerRef = createRef();

  const empty = () => {
    const containerEle = containerRef.current;
    if (!containerEle) {
      return;
    }
    containerEle.innerHTML = '';
  };

  const renderSvg = () => {
    const containerEle = containerRef.current;
    const viewport = page.getViewport({ rotation, scale });

    page.getOperatorList().then((operatorList) => {
      empty();
      const graphic = new PdfJs.SVGGraphics(page.commonObjs, page.objs);
      graphic.getSVG(operatorList, viewport).then((svg) => {
        svg.style.height = `${height}px`;
        svg.style.width = `${width}px`;

        containerEle.appendChild(svg);
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
