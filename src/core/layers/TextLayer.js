import { useContext, createRef, useRef } from 'react';
import WithScale from './WithScale';
import ThemeContext from '../theme/ThemeContext';
import LayerRenderStatus from '../types/LayerRenderStatus';
import PdfJs from '../vendors/PdfJs';

const TextLayer = ({ page, pageIndex, plugins, rotation, scale }) => {
  const theme = useContext(ThemeContext);
  const containerRef = createRef();
  const renderTask = useRef();

  const empty = () => {
    const containerEle = containerRef.current;
    if (!containerEle) {
      return;
    }
    const spans = containerEle.querySelectorAll(
      `span.${theme.prefixClass}-text`
    );
    const numSpans = spans.length;
    for (let i = 0; i < numSpans; i++) {
      const span = spans[i];
      containerEle.removeChild(span);
    }
  };

  const renderText = () => {
    const task = renderTask.current;
    if (task) {
      task.cancel();
    }

    const containerEle = containerRef.current;
    if (!containerEle) {
      return;
    }
    const viewport = page.getViewport({ rotation, scale });

    plugins.forEach((plugin) => {
      if (plugin.onTextLayerRender) {
        plugin.onTextLayerRender({
          ele: containerEle,
          pageIndex,
          scale,
          status: LayerRenderStatus.PreRender
        });
      }
    });
    page.getTextContent().then((textContent) => {
      empty();
      renderTask.current = PdfJs.renderTextLayer({
        container: containerEle,
        textContent,
        viewport
      });
      renderTask.current.promise.then(
        () => {
          const spans = containerEle.childNodes;
          const numSpans = spans.length;
          for (let i = 0; i < numSpans; i++) {
            const span = spans[i];
            span.classList.add(`${theme.prefixClass}-text`);
          }
          plugins.forEach((plugin) => {
            if (plugin.onTextLayerRender) {
              plugin.onTextLayerRender({
                ele: containerEle,
                pageIndex,
                scale,
                status: LayerRenderStatus.DidRender
              });
            }
          });
        },
        () => {}
      );
    });
  };

  return (
    <WithScale callback={renderText} rotation={rotation} scale={scale}>
      <div className={`${theme.prefixClass}-text-layer`} ref={containerRef} />
    </WithScale>
  );
};

export default TextLayer;
