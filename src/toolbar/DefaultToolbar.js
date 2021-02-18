import styled from 'styled-components/macro';
import { Button } from '../core';

const Div = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .editor-toolbar {
    &-left {
      display: flex;
      align-items: center;
    }

    &-center {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      flex-shrink: 1;
    }

    &-right {
      margin-left: auto;
      display: flex;
      align-items: center;
    }

    &-item {
      padding: 0px 2px;
    }
  }
`;

const DrawingTextLayer = () => (
  <Button>
    <i className="fas fa-edit"></i>
    텍스트
  </Button>
);
const DrawingSignatureLayer = () => (
  <Button>
    <i className="fas fa-pen-fancy"></i>
    사인
  </Button>
);
const DrawingCheckSignLayer = () => (
  <Button>
    <i className="fas fa-check"></i>
    체크
  </Button>
);
const DrawingImageLayer = () => (
  <Button>
    <i className="fas fa-image"></i>
    이미지
  </Button>
);

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
    <Div className="editor-toolbar">
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
      <div className="editor-toolbar-center">
        <div className="editor-toolbar-item">
          <DrawingTextLayer />
        </div>
        <div className="editor-toolbar-item">
          <DrawingSignatureLayer />
        </div>
        <div className="editor-toolbar-item">
          <DrawingCheckSignLayer />
        </div>
        <div className="editor-toolbar-item">
          <DrawingImageLayer />
        </div>
      </div>
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
    </Div>
  );
};

export default DefaultToolbar;
