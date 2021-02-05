import { useContext } from 'react';
import UpArrowIcon from './UpArrowIcon';
import { LocalizationContext, Tooltip, Position, Button } from '../core';

const TOOLTIP_OFFSET = { top: 8, left: 0 };

const GoToFirstPageButton = ({ onClick }) => {
  const l10n = useContext(LocalizationContext);

  const label =
    l10n && l10n.pageNavigation
      ? l10n.pageNavigation.goToFirstPage
      : '첫 페이지';

  return (
    <Tooltip
      position={Position.BottomCenter}
      target={
        <Button onClick={onClick}>
          <UpArrowIcon />
        </Button>
      }
      content={() => label}
      offset={TOOLTIP_OFFSET}
    />
  );
};

export default GoToFirstPageButton;
