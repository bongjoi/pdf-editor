import React from 'react';
import styled from 'styled-components/macro';
import ThumbnailContainer from './ThumbnailContainer';
import { classNames } from '../core';

const ThumbnailListBlock = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  .thumbnail-item {
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
  pageWidth,
  pageHeight,
  rotation,
  onJumpToPage
}) => {
  const { numPages } = doc;
  return (
    <ThumbnailListBlock>
      {Array(numPages)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={`thumbnail-${index}`} onClick={() => onJumpToPage(index)}>
              <div
                className={classNames({
                  ['thumbnail-item']: true,
                  ['thumbnail-item-selected']: currentPage === index
                })}
              >
                <ThumbnailContainer
                  doc={doc}
                  pageWidth={pageWidth}
                  pageHeight={pageHeight}
                  pageIndex={index}
                  rotation={rotation}
                />
              </div>
            </div>
          );
        })}
    </ThumbnailListBlock>
  );
};

export default ThumbnailList;
