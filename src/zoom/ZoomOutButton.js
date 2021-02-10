// import { useContext } from 'react';
import ZoomOutIcon from './ZoomOutIcon';
import {
  Button
  // LocalizationContext,
  // Position,
  // Tooltip
} from '../core';

// const TOOLTIP_OFFSET = { left: 0, top: 8 };

const ZoomOutButton = ({ onClick }) => {
  // const l10n = useContext(LocalizationContext);
  // const label = l10n && l10n.zoom ? l10n.zoom.zoomOut : '축소';

  return (
    // <Tooltip
    //   position={Position.BottomCenter}
    //   target={
    //     <Button onClick={onClick}>
    //       <ZoomOutIcon />
    //     </Button>
    //   }
    //   content={() => label}
    //   offset={TOOLTIP_OFFSET}
    // />
    <Button onClick={onClick}>
      <ZoomOutIcon />
    </Button>
  );
};

export default ZoomOutButton;
