import { Worker, Editor } from './core';
import workerUrl from 'pdfjs-dist/build/pdf.worker.entry';
import { DefaultLayoutPlugin } from './default-layout';

const App = () => {
  const defaultLayoutPluginInstance = DefaultLayoutPlugin();

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
