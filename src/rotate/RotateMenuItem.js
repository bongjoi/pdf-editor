import { useContext } from 'react';
import { LocalizationContext, MenuItem } from '../core';
import RotateBackwardIcon from './RotateBackwardIcon';
import RotateForwardIcon from './RotateForwardIcon';
import RotateDirection from './RotateDirection';

const RotateMenuItem = ({ direction, onClick }) => {
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
    <MenuItem icon={icon} onClick={onClick}>
      {label}
    </MenuItem>
  );
};

export default RotateMenuItem;
