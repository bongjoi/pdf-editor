import React, { useContext, createRef, useRef } from 'react';
import PdfJs from 'pdfjs-dist';
import ThemeContext from '../theme/ThemeContext';
import LayerRenderStatus from '../types/LayerRenderStatus';
import WithScale from './WithScale';

const TextLayer = ({ page, pageIndex, plugins, rotation, scale }) => {
  const theme = useContext(ThemeContext);
  const containerRef = createRef();
  const renderTask = useRef();

  const empty = () => {
    const containerElement = containerRef.current;
    if (!containerElement) return;
    const spans = containerElement.querySelectorAll(
      `span.${theme.prefixClass}-text`
    );
    const numSpans = spans.length;
    for (let i = 0; i < numSpans; i++) {
      const span = spans[i];
      containerElement.removeChild(span);
    }
  };

  const renderText = () => {
    const task = renderTask.current;
    if (task) {
      task.cancel();
    }

    const containerElement = containerRef.current;
    if (!containerElement) return;
    const viewport = page.getViewport({ rotation, scale });

    plugins.forEach((plugin) => {
      if (plugin.onTextLayerRender) {
        plugin.onTextLayerRender({
          element: containerElement,
          pageIndex,
          scale,
          status: LayerRenderStatus.PreRender
        });
      }
    });
    page.getTextContent().then((textContent) => {
      empty();
      renderTask.current = PdfJs.renderTextLayer({
        container: containerElement,
        textContent,
        viewport
      });
      renderTask.current.promise.then(
        () => {
          const spans = containerElement.childNodes;
          const numSpans = spans.length;
          for (let i = 0; i < numSpans; i++) {
            const span = spans[i];
            span.classList.add(`${theme.prefixClass}-text`);
          }
          plugins.forEach((plugin) => {
            if (plugin.onTextLayerRender) {
              plugin.onTextLayerRender({
                element: containerElement,
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
