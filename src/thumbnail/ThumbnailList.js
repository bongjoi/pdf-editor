import ThumbnailContainer from './ThumbnailContainer';
import { classNames } from '../core';

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
    <div className="editor-thumbnail-list">
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
    </div>
  );
};

export default ThumbnailList;
