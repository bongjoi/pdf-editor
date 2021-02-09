import { useContext, createRef, useRef } from 'react';
import WithScale from './WithScale';
import ThemeContext from '../theme/ThemeContext';
import LayerRenderStatus from '../types/LayerRenderStatus';

const CanvasLayer = ({
  height,
  page,
  pageIndex,
  plugins,
  rotation,
  scale,
  width
}) => {
  const theme = useContext(ThemeContext);
  const canvasRef = createRef();
  const renderTask = useRef();

  const devicePixelRatio = window.devicePixelRatio || 1;

  const renderCanvas = () => {
    const task = renderTask.current;
    if (task) {
      task.cancel();
    }

    const canvasEle = canvasRef.current;

    plugins.forEach((plugin) => {
      if (plugin.onCanvasLayerRender) {
        plugin.onCanvasLayerRender({
          ele: canvasEle,
          pageIndex,
          rotation,
          scale,
          status: LayerRenderStatus.PreRender
        });
      }
    });

    canvasEle.height = height * devicePixelRatio;
    canvasEle.width = width * devicePixelRatio;
    canvasEle.style.opacity = '0';

    const canvasContext = canvasEle.getContext('2d', { alpha: false });

    const viewport = page.getViewport({
      rotation,
      scale: scale * devicePixelRatio
    });
    renderTask.current = page.render({ canvasContext, viewport });
    renderTask.current.promise.then(
      () => {
        canvasEle.style.removeProperty('opacity');
        plugins.forEach((plugin) => {
          if (plugin.onCanvasLayerRender) {
            plugin.onCanvasLayerRender({
              ele: canvasEle,
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
      <div
        className={`${theme.prefixClass}-canvas-layer`}
        style={{
          height: `${height}px`,
          width: `${width}px`
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            transform: `scale(${1 / devicePixelRatio})`,
            transformOrigin: `top left`
          }}
        />
      </div>
    </WithScale>
  );
};

export default CanvasLayer;
