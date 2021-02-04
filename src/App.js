import { SpecialZoomLevel, Worker, Editor } from './core';
import { defaultLayoutPlugin } from './default-layout';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

const App = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
      searchPlugin: {
        onHighlightKeyword: (props) => {
          if (props.keyword.source === 'document') {
            props.highlightElement.style.outline = '2px dashed blue';
            props.highlightElement.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          }
        }
      },
      fullScreenPlugin: {
        onEnterFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.PageFit);
        },
        onExitFullScreen: (zoom) => {
          zoom(SpecialZoomLevel.PageFit);
        }
      }
    }
  });

  const { toolbarPluginInstance } = defaultLayoutPluginInstance;
  const {
    pageNavigationPluginInstance,
    searchPluginInstance,
    zoomPluginInstance
  } = toolbarPluginInstance;
  const { clearHighlights, highlight } = searchPluginInstance;
  const { zoomTo } = zoomPluginInstance;
  const { jumpToPage } = pageNavigationPluginInstance;

  return (
    <Worker workerUrl={pdfWorker}>
      <div style={{ display: 'flex', marginBottom: '16px' }}>
        <div style={{ marginRight: '8px' }}></div>
      </div>
    </Worker>
  );
};

export default App;
