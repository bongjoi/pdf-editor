import ThumbnailContainer from './ThumbnailContainer';
import styled from 'styled-components/macro';
import { classNames } from '../core';

const Div = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  .editor-thumbnail-item {
    padding: 8px;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }

    &-selected {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;

const ThumbnailList = ({
  currentPage,
  doc,
  pageHeight,
  pageWidth,
  rotation,
  onJumpToPage
}) => {
  const { numPages } = doc;
  return (
    <Div className="editor-thumbnail-list">
      {Array(numPages)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={`thumbnail-${index}`} onClick={() => onJumpToPage(index)}>
              <div
                className={classNames({
                  ['editor-thumbnail-item']: true,
                  ['editor-thumbnail-item-selected']: currentPage === index
                })}
              >
                <ThumbnailContainer
                  doc={doc}
                  pageHeight={pageHeight}
                  pageIndex={index}
                  pageWidth={pageWidth}
                  rotation={rotation}
                />
              </div>
            </div>
          );
        })}
    </Div>
  );
};

export default ThumbnailList;
