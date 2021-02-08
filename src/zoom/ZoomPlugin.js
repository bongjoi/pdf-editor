import { useMemo } from 'react';
import CurrentScale from './CurrentScale';
import Zoom from './Zoom';
import ZoomIn from './ZoomIn';
import ZoomOut from './ZoomOut';
import ZoomInButton from './ZoomInButton';
import ZoomOutButton from './ZoomOutButton';
import ZoomPopover from './ZoomPopover';
import { createStore } from '../core';

const ZoomPlugin = () => {
  const store = useMemo(() => createStore({}), []);

  const CurrentScaleDecorator = (props) => (
    <CurrentScale {...props} store={store} />
  );

  const ZoomInDecorator = (props) => <ZoomIn {...props} store={store} />;

  const ZoomInButtonDecorator = () => (
    <ZoomInDecorator>{(props) => <ZoomInButton {...props} />}</ZoomInDecorator>
  );

  const ZoomOutDecorator = (props) => <ZoomOut {...props} store={store} />;

  const ZoomOutButtonDecorator = () => (
    <ZoomOutDecorator>
      {(props) => <ZoomOutButton {...props} />}
    </ZoomOutDecorator>
  );

  const ZoomDecorator = (props) => <Zoom {...props} store={store} />;

  const ZoomPopoverDecorator = () => (
    <ZoomDecorator>{(props) => <ZoomPopover {...props} />}</ZoomDecorator>
  );

  return {
    install: (pluginFunctions) => {
      store.update('zoom', pluginFunctions.zoom);
    },
    onViewerStateChange: (viewerState) => {
      store.update('scale', viewerState.scale);
      return viewerState;
    },
    zoomTo: (scale) => {
      const zoom = store.get('zoom');
      if (zoom) {
        zoom(scale);
      }
    },
    CurrentScale: CurrentScaleDecorator,
    ZoomIn: ZoomInDecorator,
    ZoomInButton: ZoomInButtonDecorator,
    ZoomOut: ZoomOutDecorator,
    ZoomOutButton: ZoomOutButtonDecorator,
    Zoom: ZoomDecorator,
    ZoomPopover: ZoomPopoverDecorator
  };
};

export default ZoomPlugin;
