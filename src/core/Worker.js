import PdfJS from 'pdfjs-dist';

const Worker = ({ children, workerUrl }) => {
  PdfJS.GlobalWorkerOptions.workerSrc = workerUrl;
  return <>{children}</>;
};

export default Worker;
