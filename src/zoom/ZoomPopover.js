import { useContext } from 'react';
import styled from 'styled-components/macro';
import {
  LocalizationContext,
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position,
  SpecialZoomLevel
} from '../core';

const LEVELS = [0.75, 1, 1.25, 1.5];
const PORTAL_OFFSET = { left: 0, top: 8 };

const PopoverTarget = styled.span`
  padding: 8px;
  display: flex;
  align-items: center;
  .scale {
    margin-right: 4px;
  }
  .arrow {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 4px 0;
    border-color: rgba(0, 0, 0, 0.6) transparent transparent;
  }
`;

const ZoomPopover = ({ scale, onZoom }) => {
  const l10n = useContext(LocalizationContext);

  const getSpcialLevelLabel = (level) => {
    switch (level) {
      case SpecialZoomLevel.ActualSize:
        return l10n && l10n.zoom ? l10n.zoom.actualSize : '실제 크기';
      case SpecialZoomLevel.PageFit:
        return l10n && l10n.zoom ? l10n.zoom.pageFit : '페이지에 맞게';
      case SpecialZoomLevel.PageWidth:
        return l10n && l10n.zoom ? l10n.zoom.pageWidth : '페이지 너비에 맞게';
      default:
        return;
    }
  };

  const renderTarget = (toggle) => {
    const click = () => {
      toggle();
    };
    return (
      <PopoverTarget onClick={click}>
        <span className="scale">{Math.round(scale * 100)}%</span>
        <span className="arrow" />
      </PopoverTarget>
    );
  };

  const renderContent = (toggle) => (
    <Menu>
      {Object.keys(SpecialZoomLevel).map((k) => {
        const level = k;
        const clickMenuItem = () => {
          toggle();
          onZoom(level);
        };
        return (
          <MenuItem key={level} onClick={clickMenuItem}>
            {getSpcialLevelLabel(level)}
          </MenuItem>
        );
      })}
      <MenuDivider />
      {LEVELS.map((level) => {
        const clickMenuItem = () => {
          toggle();
          onZoom(level);
        };
        return (
          <MenuItem key={level} onClick={clickMenuItem}>
            {`${Math.round(level * 100)}%`}
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <Popover
      position={Position.BottomCenter}
      target={renderTarget}
      content={renderContent}
      offset={PORTAL_OFFSET}
      closeOnClickOutside={true}
      closeOnEscape={true}
    />
  );
};

export default ZoomPopover;
