import { useState, useEffect } from 'react';
import PrintStatus from './PrintStatus';
import PrintProgress from './PrintProgress';
import PrintZone from './PrintZone';

const PrintContainer = ({ doc, pageWidth, pageHeight, rotation, store }) => {
  const [printStatus, setPrintStatus] = useState(PrintStatus.Inactive);
  const [numLoadedPagesForPrint, setNumLoadedPagesForPrint] = useState(0);

  const cancelPrinting = () => {
    setNumLoadedPagesForPrint(0);
    setPrintStatus(PrintStatus.Inactive);
  };

  const startPrinting = () => {
    setNumLoadedPagesForPrint(0);
    setPrintStatus(PrintStatus.Ready);
  };

  const handlePrintStatus = (status) => setPrintStatus(status);

  useEffect(() => {
    store.subscribe('printStatus', handlePrintStatus);
    return () => {
      store.unsubscribe('printStatus', handlePrintStatus);
    };
  }, []);

  return (
    <>
      {printStatus === PrintStatus.Preparing && (
        <PrintProgress
          numLoadedPages={numLoadedPagesForPrint}
          numPages={doc.numPages}
          onCancel={cancelPrinting}
          onStartPrinting={startPrinting}
        />
      )}
      {(printStatus === PrintStatus.Preparing ||
        printStatus === PrintStatus.Ready) && (
        <PrintZone
          doc={doc}
          pageHeight={pageHeight}
          pageWidth={pageWidth}
          printStatus={printStatus}
          rotation={rotation}
          onCancel={cancelPrinting}
          onLoad={setNumLoadedPagesForPrint}
        />
      )}
    </>
  );
};

export default PrintContainer;
