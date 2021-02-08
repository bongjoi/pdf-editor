import { useContext } from 'react';
import { Button, LocalizationContext, Position, Tooltip } from '../core';
import RotateBackwardIcon from './RotateBackwardIcon';
import RotateForwardIcon from './RotateForwardIcon';
import RotateDirection from './RotateDirection';

const TOOLTIP_OFFSET = { left: 0, top: 8 };

const RotateButton = ({ direction, onClick }) => {
  const l10n = useContext(LocalizationContext);

  const backwardLabel =
    l10n && l10n.rotate ? l10n.rotate.rotateBackward : '왼쪽으로 회전';
  const forwardLabel =
    l10n && l10n.rotate ? l10n.rotate.rotateForward : '오른쪽으로 회전';
  const label =
    direction === RotateDirection.Backward ? backwardLabel : forwardLabel;
  const icon =
    direction === RotateDirection.Backward ? (
      <RotateBackwardIcon />
    ) : (
      <RotateForwardIcon />
    );

  return (
    <Tooltip
      position={Position.BottomCenter}
      target={<Button onClick={onClick}>{icon}</Button>}
      content={() => label}
      offset={TOOLTIP_OFFSET}
    />
  );
};

export default RotateButton;
