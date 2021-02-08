import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PageThumbnailContainer from './PageThumbnailContainer';
import PrintStatus from './PrintStatus';

const PrintZone = ({
  doc,
  pageHeight,
  pageWidth,
  printStatus,
  rotation,
  onCancel,
  onLoad
}) => {
  const [numLoadedPages, setNumLoadedPages] = useState(0);

  useEffect(() => {
    if (printStatus === PrintStatus.Ready) {
      document.body.classList.add('editor-body-printing');
      window.print();
    }

    const handler = () => {
      if (printStatus === PrintStatus.Ready) {
        document.body.classList.remove('editor-body-printing');
        onCancel();
      }
    };
    document.addEventListener('mousemove', handler);

    return () => document.removeEventListener('mousemove', handler);
  }, [printStatus]);

  const { numPages } = doc;
  const loadPage = () => {
    const total = numLoadedPages + 1;
    setNumLoadedPages(total);
    onLoad(total);
  };

  return createPortal(
    <>
      <div className="editor-print-zone">
        {Array(numPages)
          .fill(0)
          .map((_, index) => {
            return (
              <PageThumbnailContainer
                key={index}
                doc={doc}
                pageWidth={pageWidth}
                pageHeight={pageHeight}
                pageIndex={index}
                rotation={rotation}
                onLoad={loadPage}
              />
            );
          })}
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @supports ((size:A4) and (size:1pt 1pt)) {
              @page { size: ${pageWidth}pt ${pageHeight}pt }
            }
          `
        }}
      ></style>
    </>,
    document.body
  );
};

export default PrintZone;
