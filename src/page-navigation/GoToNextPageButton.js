// import { useContext } from 'react';
import NextIcon from './NextIcon';
import {
  Button
  // LocalizationContext,
  // Position,
  // Tooltip
} from '../core';

// const TOOLTIP_OFFSET = { left: 0, top: 8 };

const GoToNextPageButton = ({ onClick }) => {
  // const l10n = useContext(LocalizationContext);
  // const label =
  //   l10n && l10n.pageNavigation
  //     ? l10n.pageNavigation.goToNextPage
  //     : '다음 페이지';

  return (
    // <Tooltip
    //   position={Position.BottomCenter}
    //   target={
    //     <Button onClick={onClick}>
    //       <NextIcon />
    //     </Button>
    //   }
    //   content={() => label}
    //   offset={TOOLTIP_OFFSET}
    // />
    <Button onClick={onClick}>
      <NextIcon />
    </Button>
  );
};

export default GoToNextPageButton;
