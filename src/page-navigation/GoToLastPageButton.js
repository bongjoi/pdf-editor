import { useContext } from 'react';
import DownArrowIcon from './DownArrowIcon';
import { Button, LocalizationContext, Position, Tooltip } from '../core';

const TOOLTIP_OFFSET = { left: 0, top: 8 };

const GoToLastPageButton = ({ onClick }) => {
  const l10n = useContext(LocalizationContext);
  const label =
    l10n && l10n.pageNavigation
      ? l10n.pageNavigation.goToLastPage
      : '마지막 페이지';

  return (
    <Tooltip
      position={Position.BottomCenter}
      target={
        <Button onClick={onClick}>
          <DownArrowIcon />
        </Button>
      }
      content={() => label}
      offset={TOOLTIP_OFFSET}
    />
  );
};

export default GoToLastPageButton;
