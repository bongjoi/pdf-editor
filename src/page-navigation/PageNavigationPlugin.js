import { useMemo } from 'react';
import { createStore } from '../core';
import CurrentPageInput from './CurrentPageInput';
import CurrentPageLabel from './CurrentPageLabel';
import GoToFirstPage from './GoToFirstPage';
import GoToFirstPageButton from './GoToFirstPageButton';
import GoToLastPage from './GoToLastPage';
import GoToLastPageButton from './GoToLastPageButton';
import GoToNextPage from './GoToNextPage';
import GoToNextPageButton from './GoToNextPageButton';
import GoToPreviousPage from './GoToPreviousPage';
import GoToPreviousPageButton from './GoToPreviousPageButton';

const PageNavigationPlugin = () => {
  const store = useMemo(() => createStore(), []);

  const CurrentPageInputDecorator = () => <CurrentPageInput store={store} />;

  const CurrentPageLabelDecorator = (props) => (
    <CurrentPageLabel {...props} store={store} />
  );

  const GoToFirstPageDecorator = (props) => (
    <GoToFirstPage {...props} store={store} />
  );

  const GoToFirstPageButtonDecorator = () => (
    <GoToFirstPageDecorator>
      {(props) => <GoToFirstPageButton {...props} />}
    </GoToFirstPageDecorator>
  );

  const GoToLastPageDecorator = (props) => (
    <GoToLastPage {...props} store={store} />
  );

  const GoToLastPageButtonDecorator = () => (
    <GoToLastPageDecorator>
      {(props) => <GoToLastPageButton {...props} />}
    </GoToLastPageDecorator>
  );

  const GoToNextPageDecorator = (props) => (
    <GoToNextPage {...props} store={store} />
  );

  const GoToNextPageButtonDecorator = () => (
    <GoToNextPageDecorator>
      {(props) => <GoToNextPageButton {...props} />}
    </GoToNextPageDecorator>
  );

  const GoToPreviousPageDecorator = (props) => (
    <GoToPreviousPage {...props} store={store} />
  );

  const GoToPreviousPageButtonDecorator = () => (
    <GoToPreviousPageDecorator>
      {(props) => <GoToPreviousPageButton {...props} />}
    </GoToPreviousPageDecorator>
  );

  return {
    install: (pluginFunctions) => {
      store.update('jumpToPage', pluginFunctions.jumpToPage);
    },
    onDocumentLoad: (props) => {
      store.update('numberOfPages', props.doc.numPages);
    },
    onViewerStateChange: (viewerState) => {
      store.update('currentPage', viewerState.pageIndex);
      return viewerState;
    },
    jumpToPage: (pageIndex) => {
      const jumpTo = store.get('jumpToPage');
      if (jumpTo) {
        jumpTo(pageIndex);
      }
    },
    CurrentPageInput: CurrentPageInputDecorator,
    CurrentPageLabel: CurrentPageLabelDecorator,
    GoToFirstPage: GoToFirstPageDecorator,
    GoToFirstPageButton: GoToFirstPageButtonDecorator,
    GoToLastPage: GoToLastPageDecorator,
    GoToLastPageButton: GoToLastPageButtonDecorator,
    GoToNextPage: GoToNextPageDecorator,
    GoToNextPageButton: GoToNextPageButtonDecorator,
    GoToPreviousPage: GoToPreviousPageDecorator,
    GoToPreviousPageButton: GoToPreviousPageButtonDecorator
  };
};

export default PageNavigationPlugin;
