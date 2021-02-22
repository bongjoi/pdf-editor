import { useMemo } from 'react';
import { Stage, Layer } from 'react-konva';
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

  const renderViewer = (props) => {
    const currentSlot = props.slot;
    if (currentSlot.subSlot && currentSlot.subSlot.children) {
      currentSlot.subSlot.children = (
        <>
          <Stage>
            <Layer />
          </Stage>
          {currentSlot.subSlot.children}
        </>
      );
    }

    return currentSlot;
  };

  return {
    install: (pluginFunctions) => {
      store.update('getPageElement', pluginFunctions.getPageElement);
    },
    onViewerStateChange: (viewerState) => {
      store.update('currentPage', viewerState.pageIndex);
      return viewerState;
    },
    AddTextLayer: AddTextLayerDecorator,
    AddSignatureLayer: AddSignatureLayerDecorator,
    AddCheckLayer: AddCheckLayerDecorator,
    AddImageLayer: AddImageLayerDecorator,
    renderViewer
  };
};

export default AddLayerPlugin;
