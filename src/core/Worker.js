import PdfJs from './vendors/PdfJs';

const Worker = ({ children, workerUrl }) => {
  PdfJs.GlobalWorkerOptions.workerSrc = workerUrl;
  return <>{children}</>;
};

export default Worker;
