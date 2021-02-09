import { useContext, useState, useEffect } from 'react';
import { Button, LocalizationContext, Position, Tooltip } from '../core';
import ThumbnailIcon from './ThumbnailIcon';

const TOOLTIP_OFFSET = { left: 8, top: 0 };

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
    <div
      className={`editor-default-layout-sidebar ${
        opened ? 'editor-default-layout-sidebar-opened' : ''
      }`}
    >
      <div className="editor-default-layout-sidebar-tabs">
        <div className="editor-default-layout-sidebar-headers">
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
        </div>
        <div
          className={`editor-default-layout-sidebar-content ${
            opened ? 'editor-default-layout-sidebar-content-opened' : ''
          }`}
        >
          {listTabs[currentTab].content}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
