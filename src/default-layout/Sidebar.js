import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import ThumbnailIcon from './ThumbnailIcon';
import { LocalizationContext, Position, Button, Tooltip } from '../core';

const TOOLTIP_OFFSET = { top: 0, left: 8 };

const DefaultLayoutSidebar = styled.div`
  &.editor-default-layout-sidebar {
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    &-opened {
      width: 30%;
    }
    &-content {
      padding: 8px 0;
      display: none;
      flex-grow: 1;
      flex-shrink: 1;
      overflow: auto;
      &-opened {
        display: flex;
      }
    }
  }
`;
const DefaultLayoutSidebarTabs = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
const DefaultLayoutSidebarHeaders = styled.div`
  padding: 4px;
  align-items: center;
  background-color: rgb(238, 238, 238);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  .editor-default-layout-sidebar-header {
    padding: 2px;
  }
`;

const Sidebar = ({ store, thumbnailTabContent, tabs }) => {
  const l10n = useContext(LocalizationContext);
  const [opened, setOpened] = useState(false);
  const [currentTab, setCurrentTab] = useState(store.get('currentTab') || 0);

  const defaultTabs = [
    {
      content: thumbnailTabContent,
      icon: <ThumbnailIcon />,
      title: (
        <>
          {l10n && l10n.defaultLayout ? l10n.defaultLayout.thumbnail : '썸네일'}
        </>
      )
    }
  ];

  const listTabs = tabs ? tabs(defaultTabs) : defaultTabs;

  const switchToTab = (index) => {
    if (currentTab === index) {
      setOpened((isOpened) => !isOpened);
    } else {
      setOpened(true);
      setCurrentTab(index);
    }
  };

  useEffect(() => {
    store.subscribe('currentTab', switchToTab);

    return () => {
      store.unsubscribe('currentTab', switchToTab);
    };
  }, []);

  return (
    <DefaultLayoutSidebar
      className={`editor-default-layout-sidebar ${
        opened ? 'editor-default-layout-sidebar-opened' : ''
      }`}
    >
      <DefaultLayoutSidebarTabs>
        <DefaultLayoutSidebarHeaders>
          {listTabs.map((tab, index) => (
            <div key={index} className="editor-default-layout-sidebar-header">
              <Tooltip
                position={Position.RightCenter}
                target={
                  <Button
                    onClick={() => switchToTab(index)}
                    isSelected={currentTab === index}
                  >
                    {tab.icon}
                  </Button>
                }
                content={() => tab.title}
                offset={TOOLTIP_OFFSET}
              />
            </div>
          ))}
        </DefaultLayoutSidebarHeaders>
      </DefaultLayoutSidebarTabs>
      <div
        className={`editor-default-layout-sidebar-content ${
          opened ? 'editor-default-layout-sidebar-content-opened' : ''
        }`}
      >
        {listTabs[currentTab].content}
      </div>
    </DefaultLayoutSidebar>
  );
};

export default Sidebar;
