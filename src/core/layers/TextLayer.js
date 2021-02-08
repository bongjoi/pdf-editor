import React, { createRef, useRef } from 'react';
import styled from 'styled-components/macro';
import WithScale from './WithScale';
import PdfJs from '../vendors/PdfJs';
import LayerRenderStatus from '../types/LayerRenderStatus';

const TextLayerBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  line-height: 1;
  .text {
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
  }
`;

const TextLayer = ({ page, pageIndex, plugins, rotation, scale }) => {
  const containerRef = createRef();
  const renderTask = useRef();

  const empty = () => {
    const containerElement = containerRef.current;
    if (!containerElement) return;
    const spans = containerElement.querySelectorAll('span.text');
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
            span.classList.add('text');
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
      <TextLayerBlock ref={containerRef} />
    </WithScale>
  );
};

export default TextLayer;
