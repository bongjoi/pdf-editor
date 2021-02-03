import React, { useContext, useState, useEffect } from 'react';
import PdfJs from 'pdfjs-dist';
import AskForPasswordState from './AskForPasswordState';
import AskingPassword from './AskingPassword';
import WrongPasswordState from './WrongPasswordState';
import WrongPassword from './WrongPassword';
import LoadingState from './LoadingState';
import CompletedState from './CompletedState';
import FailureState from './FailureState';
import Spinner from '../components/Spinner';
import ThemeContext from '../theme/ThemeContext';
import { useIsMounted } from '../../hooks/useIsMounted';

const DocumentLoader = ({
  characterMap,
  file,
  httpHeaders,
  render,
  renderError,
  renderLoader,
  withCredentials
}) => {
  const theme = useContext(ThemeContext);
  const [status, setStatus] = useState(new LoadingState(0));
  const [percentages, setPercentages] = useState(0);
  const [loadedDocument, setLoadedDocument] = useState(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    setStatus(new LoadingState(0));

    const worker = new PdfJs.PDFWorker({ name: `PDFWorker_${Date.now()}` });
    const params = Object.assign(
      {
        httpHeaders,
        withCredentials,
        worker
      },
      typeof file === 'string' ? { url: file } : { data: file },
      characterMap
        ? { cMapUrl: characterMap.url, cMapPacked: characterMap.isCompressed }
        : {}
    );

    const loadingTask = PdfJs.getDocument(params);
    loadingTask.onPassword = (verifyPassword, reason) => {
      switch (reason) {
        case PdfJs.PasswordResponses.NEED_PASSWORD:
          isMounted.current &&
            setStatus(new AskForPasswordState(verifyPassword));
          break;
        case PdfJs.PasswordResponses.INCORRECT_PASSWORD:
          isMounted.current &&
            setStatus(new WrongPasswordState(verifyPassword));
          break;
        default:
          break;
      }
    };
    loadingTask.onProgress = (progress) => {
      progress.total > 0
        ? isMounted.current &&
          setPercentages(
            Math.min(100, (100 * progress.loaded) / progress.total)
          )
        : isMounted.current && setPercentages(100);
    };
    loadingTask.promise.then(
      (doc) => isMounted.current && setLoadedDocument(doc),
      (error) =>
        isMounted.current &&
        !worker.destroyed &&
        setStatus(
          new FailureState({
            message: error.message || '문서를 불러올 수 없습니다.',
            name: error.name
          })
        )
    );

    return () => {
      loadingTask.destroy();
      worker.destroy();
    };
  }, [characterMap, file, httpHeaders, isMounted, withCredentials]);

  useEffect(() => {
    percentages === 100 && loadedDocument
      ? isMounted.current && setStatus(new CompletedState(loadedDocument))
      : isMounted.current && setStatus(new LoadingState(percentages));
  }, [percentages, loadedDocument, isMounted]);

  switch (true) {
    case status instanceof AskForPasswordState:
      return <AskingPassword verifyPasswordFn={status.verifyPasswordFn} />;
    case status instanceof WrongPasswordState:
      return <WrongPassword verifyPasswordFn={status.verifyPasswordFn} />;
    case status instanceof CompletedState:
      return render(status.doc);
    case status instanceof FailureState:
      return renderError ? (
        renderError(status.error)
      ) : (
        <div className={`${theme.prefixClass}-doc-error`}>
          <div className={`${theme.prefixClass}-doc-error-text`}>
            {status.error.message}
          </div>
        </div>
      );
    case status instanceof LoadingState:
      return (
        <div className={`${theme.prefixClass}-doc-loading`}>
          {renderLoader ? renderLoader(status.percentages) : <Spinner />}
        </div>
      );
    default:
      return (
        <div className={`${theme.prefixClass}-doc-loading`}>
          <Spinner />
        </div>
      );
  }
};

export default DocumentLoader;
