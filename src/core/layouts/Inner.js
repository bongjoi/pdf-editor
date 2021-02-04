import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  createRef
} from 'react';
import PageLayer from '../layers/PageLayer';
import ThemeContext from '../theme/ThemeContext';
import getFileExt from '../utils/fileExt';
import { SpecialZoomLevel } from '../SpecialZoomLevel';

const SCROLL_BAR_WIDTH = 17;
const PAGE_PADDING = 8;

const Inner = ({
  defaultScale,
  doc,
  initialPage,
  pageSize,
  plugins,
  renderPage,
  viewerState,
  onDocumentLoad,
  onOpenFile,
  onPageChange,
  onZoom
}) => {
  const theme = useContext(ThemeContext);
  const containerRef = useRef(null);
  const pagesRef = useRef(null);
  const [scale, setScale] = useState(pageSize.scale);
  const [currentPage, setCurrentPage] = useState(0);
  const [rotation, setRotation] = useState(0);
  const stateRef = useRef(viewerState);
  const { numPages } = doc;
  const { pageWidth, pageHeight } = pageSize;
  const arr = Array(numPages).fill(null);
  const pageVisibility = arr.map(() => 0);
  const pageRefs = arr.map(() => createRef()); // TODO: Fix it

  const setViewerState = (viewerState) => {
    let newState = viewerState;
    plugins.forEach((plugin) => {
      if (plugin.onViewerStateChange) {
        newState = plugin.onViewerStateChange(newState);
      }
    });
    stateRef.current = newState;
  };

  const getPagesContainer = () => pagesRef.current;

  const getPageElement = (pageIndex) => {
    if (pageIndex < 0 || pageIndex >= numPages) return null;
    return pageRefs[pageIndex].current;
  };

  const getViewerState = () => stateRef.current;

  const zoom = (newScale) => {
    const pagesElement = pagesRef.current;
    const currentState = stateRef.current;
    if (!pagesElement || !currentState) return;

    let updateScale = 1;
    switch (newScale) {
      case SpecialZoomLevel.ActualSize:
        updateScale = 1;
        break;
      case SpecialZoomLevel.PageFit:
        updateScale = Math.min(
          (pagesElement.clientWidth - SCROLL_BAR_WIDTH) / pageWidth,
          (pagesElement.clientHeight - 2 * PAGE_PADDING) / pageHeight
        );
        break;
      case SpecialZoomLevel.PageWidth:
        updateScale = (pagesElement.clientWidth - SCROLL_BAR_WIDTH) / pageWidth;
        break;
      default:
        updateScale = newScale;
        break;
    }

    setScale(updateScale);
    onZoom({ doc, scale: updateScale });
  };

  const jumpToDestination = (pageIndex, bottomOffset, leftOffset, scaleTo) => {
    const pagesContainer = pagesRef.current;
    const currentState = stateRef.current;
    if (!pagesContainer || !currentState) return;

    const newPageIndex = pageIndex + 1;
    doc.getPage(newPageIndex).then((page) => {
      const viewport = page.getViewport({ scale: 1 });

      let top = 0;
      const bottom = bottomOffset || 0;
      let left = leftOffset || 0;
      switch (scaleTo) {
        case SpecialZoomLevel.PageFit:
          top = 0;
          left = 0;
          zoom(SpecialZoomLevel.PageFit);
          break;
        case SpecialZoomLevel.PageWidth:
          top = (viewport.height - bottom) * currentState.scale;
          left = left * currentState.scale;
          zoom(SpecialZoomLevel.PageWidth);
          break;
        default:
          top = (viewport.height - bottom) * currentState.scale;
          left = left * currentState.scale;
          break;
      }

      const targetPageElement = pageRefs[pageIndex].current;
      if (targetPageElement) {
        pagesContainer.scrollTop = targetPageElement.offsetTop + top;
        pagesContainer.scrollLeft = targetPageElement.offsetLeft + left;
      }
    });
  };

  const jumpToPage = (pageIndex) => {
    if (pageIndex < 0 || pageIndex >= numPages) return;

    const pagesContainer = pagesRef.current;
    const targetPage = pageRefs[pageIndex].current;
    if (pagesContainer && targetPage) {
      pagesContainer.scrollTop = targetPage.offsetTop;
      pagesContainer.scrollLeft = targetPage.offsetLeft;
    }
    setCurrentPage(pageIndex);
  };

  const openFile = (file) => {
    if (getFileExt(file.name).toLowerCase() !== 'pdf') return;

    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const bytes = new Uint8Array(reader.result);
        resolve(bytes);
      };
    }).then((data) => {
      onOpenFile(file.name, data);
    });
  };

  const rotate = (updateRotation) => {
    setRotation(updateRotation);
    setViewerState({
      file: viewerState.file,
      pageIndex: currentPage,
      pageHeight,
      pageWidth,
      rotation: updateRotation,
      scale
    });
  };

  useEffect(() => {
    const pagesElement = pagesRef.current;
    const currentState = stateRef.current;
    if (!pagesElement || !currentState) return;

    pagesElement.scrollTop =
      (pagesElement.scrollTop * scale) / currentState.scale;
    pagesElement.scrollLeft =
      (pagesElement.scrollLeft * scale) / currentState.scale;

    setViewerState({
      file: viewerState.file,
      pageIndex: currentState.pageIndex,
      pageWidth,
      pageHeight,
      rotation,
      scale
    });
  }, [scale]);

  const getPluginMethods = () => ({
    getPageElement,
    getPagesContainer,
    getViewerState,
    jumpToDestination,
    jumpToPage,
    openFile,
    rotate,
    setViewerState,
    zoom
  });

  useEffect(() => {
    const pluginMethods = getPluginMethods();

    plugins.forEach((plugin) => {
      if (plugin.install) {
        plugin.install(pluginMethods);
      }
    });

    return () => {
      plugins.forEach((plugin) => {
        if (plugin.uninstall) {
          plugin.uninstall(pluginMethods);
        }
      });
    };
  }, []);

  useEffect(() => {
    onDocumentLoad({ doc });
    plugins.forEach((plugin) => {
      plugin.onDocumentLoad && plugin.onDocumentLoad({ doc });
    });
    if (initialPage) {
      jumpToPage(initialPage);
    }
  }, []);

  useEffect(() => {
    onPageChange({ currentPage, doc });
    setViewerState({
      file: viewerState.file,
      pageIndex: currentPage,
      pageWidth,
      pageHeight,
      rotation,
      scale
    });
  }, [currentPage]);

  useEffect(() => {
    if (defaultScale) {
      zoom(defaultScale);
    }
  }, []);

  const pageVisibilityChanged = (pageIndex, ratio) => {
    pageVisibility[pageIndex] = ratio;
    const maxRatioPage = pageVisibility.reduce(
      (maxIndex, item, index, array) => {
        return item > array[maxIndex] ? index : maxIndex;
      },
      0
    );
    setCurrentPage(maxRatioPage);
  };

  const executeNamedAction = (action) => {
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;
    switch (action) {
      case 'FirstPage':
        jumpToPage(0);
        break;
      case 'LastPage':
        jumpToPage(numPages - 1);
        break;
      case 'NextPage':
        nextPage < numPages && jumpToPage(nextPage);
        break;
      case 'PrevPage':
        previousPage >= 0 && jumpToPage(previousPage);
        break;
      default:
        break;
    }
  };

  const renderViewer = () => {
    let slot = {
      attrs: {
        ref: containerRef,
        style: {
          height: '100%'
        }
      },
      children: <></>,
      subSlot: {
        attrs: {
          ref: pagesRef,
          style: {
            height: '100%',
            overflow: 'auto',
            position: 'relative'
          }
        },
        children: (
          <>
            {Array(numPages)
              .fill(0)
              .map((_, index) => {
                return (
                  <div
                    className={`${theme.prefixClass}-inner-page`}
                    key={`pagelayer-${index}`}
                    ref={(ref) => {
                      pageRefs[index].current = ref;
                    }}
                  >
                    <PageLayer
                      currentPage={currentPage}
                      doc={doc}
                      width={pageWidth}
                      height={pageHeight}
                      pageIndex={index}
                      plugins={plugins}
                      renderPage={renderPage}
                      rotation={rotation}
                      scale={scale}
                      onPageVisibilityChanged={pageVisibilityChanged}
                    />
                  </div>
                );
              })}
          </>
        )
      }
    };

    plugins.forEach((plugin) => {
      if (plugin.renderViewer) {
        slot = plugin.renderViewer({
          containerRef,
          doc,
          pageWidth,
          pageHeight,
          rotation,
          slot,
          jumpToPage,
          openFile,
          rotate,
          zoom
        });
      }
    });

    return slot;
  };

  const renderSlot = (slot) => (
    <div
      {...slot.attrs}
      style={slot.attrs && slot.attrs.style ? slot.attrs.style : {}}
    >
      {slot.children}
      {slot.subSlot && renderSlot(slot.subSlot)}
    </div>
  );

  return renderSlot(renderViewer());
};

export default Inner;
