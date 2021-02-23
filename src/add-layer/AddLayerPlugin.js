import { useMemo } from 'react';
import AddTextLayer from './AddTextLayer';
import AddSignatureLayer from './AddSignatureLayer';
import AddCheckLayer from './AddCheckLayer';
import AddImageLayer from './AddImageLayer';
import { createStore } from '../core';

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
    AddTextLayer: AddTextLayerDecorator,
    AddSignatureLayer: AddSignatureLayerDecorator,
    AddCheckLayer: AddCheckLayerDecorator,
    AddImageLayer: AddImageLayerDecorator
  };
};

export default AddLayerPlugin;
