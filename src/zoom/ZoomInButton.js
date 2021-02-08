import { useContext } from 'react';
import { Button, LocalizationContext, Position, Tooltip } from '../core';
import ZoomInIcon from './ZoomInIcon';

const TOOLTIP_OFFSET = { left: 0, top: 8 };

const ZoomInButton = ({ onClick }) => {
  const l10n = useContext(LocalizationContext);
  const label = l10n && l10n.zoom ? l10n.zoom.zoomIn : '확대';

  return (
    <Tooltip
      position={Position.BottomCenter}
      target={
        <Button onClick={onClick}>
          <ZoomInIcon />
        </Button>
      }
      content={() => label}
      offset={TOOLTIP_OFFSET}
    />
  );
};

export default ZoomInButton;
