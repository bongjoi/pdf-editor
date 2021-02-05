import { useContext } from 'react';
import { Button, LocalizationContext, Position, Tooltip } from '../core';
import PrintIcon from './PrintIcon';

const TOOLTIP_OFFSET = { left: 0, top: 8 };

const PrintButton = ({ onClick }) => {
  const l10n = useContext(LocalizationContext);
  const label = l10n && l10n.print ? l10n.print.print : '인쇄';

  return (
    <Tooltip
      position={Position.BottomCenter}
      target={
        <Button onClick={onClick}>
          <PrintIcon />
        </Button>
      }
      content={() => label}
      offset={TOOLTIP_OFFSET}
    />
  );
};

export default PrintButton;
