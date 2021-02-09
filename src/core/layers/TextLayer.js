import { useContext, createRef, useRef } from 'react';
import styled from 'styled-components/macro';
import WithScale from './WithScale';
import ThemeContext from '../theme/ThemeContext';
import LayerRenderStatus from '../types/LayerRenderStatus';
import PdfJs from '../vendors/PdfJs';

const Div = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  line-height: 1;

  .editor-text {
    position: absolute;
    color: transparent;
    opacity: 0.2;
    transform-origin: 0% 0%;
    white-space: pre;
    cursor: text;

    &::selection {
      color: transparent;
      background: rgb(0, 0, 255, 0.5);
    }

    &-highlight {
      margin: -1px;
      padding: 1px;
      background-color: rgb(180, 0, 170);
      border-radius: 4px;
    }
  }
`;

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
      <Div className={`${theme.prefixClass}-text-layer`} ref={containerRef} />
    </WithScale>
  );
};

export default TextLayer;
