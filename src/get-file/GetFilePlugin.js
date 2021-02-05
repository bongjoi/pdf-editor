import { useMemo } from 'react';
import Download from './Download';
import DownloadButton from './DownloadButton';
import { createStore, getFileName } from '../core';

const GetFilePlugin = (props) => {
  const store = useMemo(() => createStore({}), []);

  const defaultFileNameGenerator = (file) => getFileName(file.name);

  const DownloadDecorator = (downloadProps) => (
    <Download
      {...downloadProps}
      fileNameGenerator={
        props
          ? props.fileNameGenerator || defaultFileNameGenerator
          : defaultFileNameGenerator
      }
      store={store}
    />
  );

  const DownloadButtonDecorator = () => (
    <DownloadDecorator>
      {(props) => <DownloadButton {...props} />}
    </DownloadDecorator>
  );

  return {
    onViewerStateChange: (viewerState) => {
      store.update('file', viewerState.file);
      return viewerState;
    },
    Download: DownloadDecorator,
    DownloadButton: DownloadButtonDecorator
  };
};

export default GetFilePlugin;
