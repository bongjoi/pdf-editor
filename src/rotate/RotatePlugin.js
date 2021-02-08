import { useMemo } from 'react';
import { createStore } from '../core';
import Rotate from './Rotate';
import RotateButton from './RotateButton';
import RotateMenuItem from './RotateMenuItem';
import RotateDirection from './RotateDirection';

const RotatePlugin = () => {
  const store = useMemo(() => createStore({ rotation: 0 }), []);

  const RotateDecorator = (props) => <Rotate {...props} store={store} />;

  const RotateBackwardButtonDecorator = () => (
    <RotateDecorator direction={RotateDirection.Backward}>
      {(props) => <RotateButton {...props} />}
    </RotateDecorator>
  );

  const RotateBackwardMenuItemDecorator = (props) => (
    <RotateDecorator direction={RotateDirection.Backward}>
      {(p) => (
        <RotateMenuItem
          direction={p.direction}
          onClick={() => {
            p.onClick();
            props.onClick();
          }}
        />
      )}
    </RotateDecorator>
  );

  const RotateForwardButtonDecorator = () => (
    <RotateDecorator direction={RotateDirection.Forward}>
      {(props) => <RotateButton {...props} />}
    </RotateDecorator>
  );

  const RotateForwardMenuItemDecorator = (props) => (
    <RotateDecorator direction={RotateDirection.Forward}>
      {(p) => (
        <RotateMenuItem
          direction={p.direction}
          onClick={() => {
            p.onClick();
            props.onClick();
          }}
        />
      )}
    </RotateDecorator>
  );

  return {
    install: (pluginFunctions) => {
      store.update('rotate', pluginFunctions.rotate);
    },
    onViewerStateChange: (viewerState) => {
      store.update('rotation', viewerState.rotation);
      return viewerState;
    },
    Rotate: RotateDecorator,
    RotateBackwardButton: RotateBackwardButtonDecorator,
    RotateBackwardMenuItem: RotateBackwardMenuItemDecorator,
    RotateForwardButton: RotateForwardButtonDecorator,
    RotateForwardMenuItem: RotateForwardMenuItemDecorator
  };
};

export default RotatePlugin;
