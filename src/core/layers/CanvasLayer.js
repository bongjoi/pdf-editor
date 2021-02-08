import React, { createRef, useRef } from 'react';
import styled from 'styled-components/macro';
import WithScale from './WithScale';
import LayerRenderStatus from '../types/LayerRenderStatus';

const CanvasLayerBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const CanvasLayer = ({
  width,
  height,
  page,
  pageIndex,
  plugins,
  rotation,
  scale
}) => {
  const canvasRef = createRef();
  const renderTask = useRef();

  const devicePixelRatio = window.devicePixelRatio || 1;

  const renderCanvas = () => {
    const task = renderTask.current;
    if (task) {
      task.cancel();
    }

    const canvasElement = canvasRef.current;

    plugins.forEach((plugin) => {
      if (plugin.onCanvasLayerRender) {
        plugin.onCanvasLayerRender({
          element: canvasElement,
          pageIndex,
          rotation,
          scale,
          status: LayerRenderStatus.PreRender
        });
      }
    });

    canvasElement.width = width * devicePixelRatio;
    canvasElement.height = height * devicePixelRatio;
    canvasElement.style.opacity = '0';

    const canvasContext = canvasElement.getContext('2d', { alpha: false });

    const viewport = page.getViewport({
      rotation,
      scale: scale * devicePixelRatio
    });
    renderTask.current = page.render({ canvasContext, viewport });
    renderTask.current.promise.then(
      () => {
        canvasElement.style.removeProperty('opacity');
        plugins.forEach((plugin) => {
          if (plugin.onCanvasLayerRender) {
            plugin.onCanvasLayerRender({
              element: canvasElement,
              pageIndex,
              rotation,
              scale,
              status: LayerRenderStatus.DidRender
            });
          }
        });
      },
      () => {}
    );
  };

  return (
    <WithScale callback={renderCanvas} rotation={rotation} scale={scale}>
      <CanvasLayerBlock style={{ width: `${width}px`, height: `${height}px` }}>
        <canvas
          ref={canvasRef}
          style={{
            transform: `scale(${1 / devicePixelRatio})`,
            transformOrigin: 'top left'
          }}
        />
      </CanvasLayerBlock>
    </WithScale>
  );
};

export default CanvasLayer;
