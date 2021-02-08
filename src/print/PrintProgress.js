import { useContext, useEffect } from 'react';
import { LocalizationContext, PrimaryButton, ProgressBar } from '../core';

const PrintProgress = ({
  numLoadedPages,
  numPages,
  onCancel,
  onStartPrinting
}) => {
  const l10n = useContext(LocalizationContext);
  const progress = Math.floor((numLoadedPages * 100) / numPages);
  useEffect(() => {
    if (numLoadedPages === numPages) {
      onStartPrinting();
    }
  }, [numLoadedPages]);

  return (
    <div className="editor-print-progress">
      <div className="editor-print-progress-inner">
        <div className="editor-print-progress-message">
          {l10n && l10n.print
            ? l10n.print.preparingDocument
            : '문서 불러오는중...'}
        </div>
        <div className="editor-print-progress-bar">
          <ProgressBar progress={progress} />
        </div>
        <PrimaryButton onClick={onCancel}>
          {l10n && l10n.print ? l10n.print.cancel : '취소'}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default PrintProgress;
