import React from 'react';

const DefaultToolbar = (toolbarSlot) => {
  const {
    CurrentPageInput,
    Download,
    GoToNextPage,
    GoToPreviousPage,
    NumberOfPages,
    Print,
    Zoom,
    ZoomIn,
    ZoomOut
  } = toolbarSlot;

  return (
    <div className="pdf-editor-toolbar">
      <div className="pdf-editor-toolbar-left">
        <div className="pdf-editor-toolbar-item">
          <GoToPreviousPage />
        </div>
        <div className="pdf-editor-toolbar-item">
          <CurrentPageInput /> / <NumberOfPages />
        </div>
        <div className="pdf-editor-toolbar-item">
          <GoToNextPage />
        </div>
      </div>
      <div className="pdf-editor-toolbar-center">
        <div className="pdf-editor-toolbar-item">
          <ZoomOut />
        </div>
        <div className="pdf-editor-toolbar-item">
          <Zoom />
        </div>
        <div className="pdf-editor-toolbar-item">
          <ZoomIn />
        </div>
      </div>
      <div className="pdf-editor-toolbar-right">
        <div className="pdf-editor-toolbar-item">
          <Download />
        </div>
        <div className="pdf-editor-toolbar-item">
          <Print />
        </div>
      </div>
    </div>
  );
};

export default DefaultToolbar;
