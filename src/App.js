import { SpecialZoomLevel, Worker, Editor } from './core';
import { DefaultLayoutPlugin } from './default-layout';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

const App = () => {
  const defaultLayoutPluginInstance = DefaultLayoutPlugin({
    toolbarPlugin: {}
  });

  const { toolbarPluginInstance } = defaultLayoutPluginInstance;
  const {
    pageNavigationPluginInstance,
    zoomPluginInstance
  } = toolbarPluginInstance;
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
