import React from 'react';
import ThumbnailContainer from './ThumbnailContainer';
import { classNames } from '../core';

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
    <div className="pdf-editor-thumbnail-list">
      {Array(numPages)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={`thumbnail-${index}`} onClick={() => onJumpToPage(index)}>
              <div
                className={classNames({
                  ['pdf-editor-thumbnail-item']: true,
                  ['pdf-editor-thumbnail-item-selected']: currentPage === index
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
    </div>
  );
};

export default ThumbnailList;
