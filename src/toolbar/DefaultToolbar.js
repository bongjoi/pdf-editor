const DefaultToolbar = (toolbarSlot) => {
  const {
    CurrentPageInput,
    GoToNextPage,
    GoToLastPage,
    GoToPreviousPage,
    GoToFirstPage,
    NumberOfPages,
    Zoom,
    ZoomIn,
    ZoomOut
  } = toolbarSlot;

  return (
    <div className="editor-toolbar">
      <div className="editor-toolbar-left">
        <div className="editor-toolbar-item">
          <GoToFirstPage />
        </div>
        <div className="editor-toolbar-item">
          <GoToPreviousPage />
        </div>
        <div className="editor-toolbar-item">
          <CurrentPageInput /> / <NumberOfPages />
        </div>
        <div className="editor-toolbar-item">
          <GoToNextPage />
        </div>
        <div className="editor-toolbar-item">
          <GoToLastPage />
        </div>
      </div>
      <div className="editor-toolbar-center"></div>
      <div className="editor-toolbar-right">
        <div className="editor-toolbar-item">
          <ZoomOut />
        </div>
        <div className="editor-toolbar-item">
          <Zoom />
        </div>
        <div className="editor-toolbar-item">
          <ZoomIn />
        </div>
      </div>
    </div>
  );
};

export default DefaultToolbar;
