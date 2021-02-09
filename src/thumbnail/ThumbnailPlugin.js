import { useMemo } from 'react';
import ThumbnailListWithStore from './ThumbnailListWithStore';
import { createStore } from '../core';

const ThumbnailPlugin = () => {
  const store = useMemo(() => createStore({}), []);

  const ThumbnailsDecorator = () => <ThumbnailListWithStore store={store} />;

  return {
    install: (pluginFunctions) => {
      store.update('jumpToPage', pluginFunctions.jumpToPage);
    },
    onDocumentLoad: (props) => {
      store.update('doc', props.doc);
    },
    onViewerStateChange: (viewerState) => {
      store.update('currentPage', viewerState.pageIndex);
      store.update('pageHeight', viewerState.pageHeight);
      store.update('pageWidth', viewerState.pageWidth);
      return viewerState;
    },
    Thumbnails: ThumbnailsDecorator
  };
};

export default ThumbnailPlugin;
