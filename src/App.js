import workerUrl from 'pdfjs-dist/build/pdf.worker.entry';
import { Worker, Editor } from './core';
import { defaultLayoutPlugin } from './default-layout';

const App = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl={workerUrl}>
      <Editor
        fileUrl="http://localhost:3000/pdf.pdf"
        plugins={[defaultLayoutPluginInstance]}
      />
    </Worker>
  );
};

export default App;
