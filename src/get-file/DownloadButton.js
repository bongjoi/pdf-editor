import { useContext } from 'react';
import { Button, LocalizationContext, Position, Tooltip } from '../core';
import DownloadIcon from './DownloadIcon';

const TOOLTIP_OFFSET = { left: 0, top: 8 };

const DownloadButton = ({ onClick }) => {
  const l10n = useContext(LocalizationContext);

  const label = l10n && l10n.download ? l10n.download.download : '다운로드';

  return (
    <Tooltip
      position={Position.BottomCenter}
      target={
        <Button onClick={onClick}>
          <DownloadIcon />
        </Button>
      }
      content={() => label}
      offset={TOOLTIP_OFFSET}
    />
  );
};

export default DownloadButton;
