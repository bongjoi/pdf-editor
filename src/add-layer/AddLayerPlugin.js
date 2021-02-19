import { useMemo } from 'react';
import { createStore } from '../core';
import AddTextLayer from './AddTextLayer';
import AddSignatureLayer from './AddSignatureLayer';
import AddCheckLayer from './AddCheckLayer';
import AddImageLayer from './AddImageLayer';

const AddLayerPlugin = () => {
  const store = useMemo(() => createStore({}), []);

  const AddTextLayerDecorator = (props) => (
    <AddTextLayer {...props} store={store} />
  );

  const AddSignatureLayerDecorator = (props) => (
    <AddSignatureLayer {...props} store={store} />
  );

  const AddCheckLayerDecorator = (props) => (
    <AddCheckLayer {...props} store={store} />
  );

  const AddImageLayerDecorator = (props) => (
    <AddImageLayer {...props} store={store} />
  );

  return {
    install: (pluginFunctions) => {
      store.update('getPageElement', pluginFunctions.getPageElement);
      store.update('getPagesContainer', pluginFunctions.getPagesContainer);
    },
    onViewerStateChange: (viewerState) => {
      store.update('rotation', viewerState.rotation);
      return viewerState;
    },
    AddTextLayer: AddTextLayerDecorator,
    AddSignatureLayer: AddSignatureLayerDecorator,
    AddCheckLayer: AddCheckLayerDecorator,
    AddImageLayer: AddImageLayerDecorator
  };
};

export default AddLayerPlugin;
