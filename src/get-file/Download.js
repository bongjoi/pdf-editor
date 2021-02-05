import { useState, useEffect } from 'react';
import DownloadButton from './DownloadButton';
import downloadFile from './downloadFile';

const Download = ({ children, fileNameGenerator, store }) => {
  const [currentFile, setCurrentFile] = useState();

  const handleFileChanged = (file) => {
    setCurrentFile(file);
  };

  useEffect(() => {
    store.subscribe('file', handleFileChanged);

    return () => {
      store.unsubscribe('file', handleFileChanged);
    };
  }, []);

  const download = () => {
    if (currentFile) {
      downloadFile(currentFile, fileNameGenerator(currentFile));
    }
  };

  const defaultChildren = (props) => <DownloadButton onClick={props.onClick} />;
  const render = children || defaultChildren;

  return render({
    onClick: download
  });
};

export default Download;
