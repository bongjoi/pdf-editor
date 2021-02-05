import { useContext } from 'react';
import PreviousIcon from './PreviousIcon';
import { Button, LocalizationContext, Position, Tooltip } from '../core';

const TOOLTIP_OFFSET = { left: 0, top: 8 };

const GoToPreviousPageButton = ({ onClick }) => {
  const l10n = useContext(LocalizationContext);
  const label =
    l10n && l10n.pageNavigation
      ? l10n.pageNavigation.goToPreviousPage
      : '이전 페이지';

  return (
    <Tooltip
      position={Position.BottomCenter}
      target={
        <Button onClick={onClick}>
          <PreviousIcon />
        </Button>
      }
      content={() => label}
      offset={TOOLTIP_OFFSET}
    />
  );
};

export default GoToPreviousPageButton;
