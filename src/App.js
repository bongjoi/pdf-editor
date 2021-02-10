import styled from 'styled-components/macro';
import workerUrl from 'pdfjs-dist/build/pdf.worker.entry';
import { Worker, Editor } from './core';
import { defaultLayoutPlugin } from './default-layout';

const Container = styled.div`
  height: 100vh;
`;

const App = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl={workerUrl}>
      <Container>
        <Editor
          fileUrl="http://localhost:3000/pdf_sample.pdf"
          plugins={[defaultLayoutPluginInstance]}
        />
      </Container>
    </Worker>
  );
};

export default App;
