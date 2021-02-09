import { useState, useEffect } from 'react';
import Inner from './layouts/Inner';
import PageSizeCalculator from './layouts/PageSizeCalculator';
import DocumentLoader from './loader/DocumentLoader';
import LocalizationProvider from './localization/LocalizationProvider';
import ThemeProvider from './theme/ThemeProvider';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { usePrevRef } from '../hooks/usePrevRef';

const Viewer = ({
  characterMap,
  defaultScale,
  fileUrl,
  httpHeaders = {},
  initialPage = 0,
  localization,
  plugins = [],
  prefixClass,
  renderError,
  renderPage,
  renderLoader,
  withCredentials = false,
  onDocumentLoad = () => {},
  onPageChange = () => {},
  onZoom = () => {}
}) => {
  const [file, setFile] = useState({
    data: fileUrl,
    name: typeof fileUrl === 'string' ? fileUrl : '',
    shouldLoad: false
  });

  const openFile = (fileName, data) => {
    setFile({
      data,
      name: fileName,
      shouldLoad: true
    });
  };
  const [visible, setVisible] = useState(false);

  const prevFile = usePrevRef(file);

  useEffect(() => {
    if (prevFile.data !== fileUrl) {
      setFile({
        data: fileUrl,
        name: typeof fileUrl === 'string' ? fileUrl : '',
        shouldLoad: visible
      });
    }
  }, [fileUrl, visible]);

  const visibilityChanged = (params) => {
    setVisible(params.isVisible);
    if (params.isVisible) {
      setFile((currentFile) =>
        Object.assign({}, currentFile, { shouldLoad: true })
      );
    }
  };

  const containerRef = useIntersectionObserver({
    onVisibilityChanged: visibilityChanged
  });

  return (
    <ThemeProvider prefixClass={prefixClass}>
      <LocalizationProvider localization={localization}>
        {(_) => (
          <div
            ref={containerRef}
            data-testid="viewer"
            style={{
              height: '100%',
              width: '100%'
            }}
          >
            {file.shouldLoad && (
              <DocumentLoader
                characterMap={characterMap}
                file={file.data}
                httpHeaders={httpHeaders}
                render={(doc) => (
                  <PageSizeCalculator
                    doc={doc}
                    render={(ps) => (
                      <Inner
                        defaultScale={defaultScale}
                        doc={doc}
                        initialPage={initialPage}
                        pageSize={ps}
                        plugins={plugins}
                        renderPage={renderPage}
                        viewerState={{
                          file,
                          pageIndex: initialPage,
                          pageHeight: ps.pageHeight,
                          pageWidth: ps.pageWidth,
                          rotation: 0,
                          scale: ps.scale
                        }}
                        onDocumentLoad={onDocumentLoad}
                        onOpenFile={openFile}
                        onPageChange={onPageChange}
                        onZoom={onZoom}
                      />
                    )}
                  />
                )}
                renderError={renderError}
                renderLoader={renderLoader}
                withCredentials={withCredentials}
              />
            )}
          </div>
        )}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Viewer;
