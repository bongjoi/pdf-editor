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

const DefaultToolbar = ({
  CurrentPageInput,
  GoToNextPage,
  GoToLastPage,
  GoToPreviousPage,
  GoToFirstPage,
  NumberOfPages,
  AddTextLayer,
  AddSignatureLayer,
  AddCheckLayer,
  AddImageLayer,
  Zoom,
  ZoomIn,
  ZoomOut
}) => (
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
        <AddTextLayer />
      </div>
      <div className="editor-toolbar-item">
        <AddSignatureLayer />
      </div>
      <div className="editor-toolbar-item">
        <AddCheckLayer />
      </div>
      <div className="editor-toolbar-item">
        <AddImageLayer />
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

export default DefaultToolbar;
