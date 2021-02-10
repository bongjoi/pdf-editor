import {
  // useContext,
  useState,
  useEffect
} from 'react';
import styled from 'styled-components/macro';
import {
  Button
  // LocalizationContext,
  // Position,
  // Tooltip
} from '../core';
import ThumbnailIcon from './ThumbnailIcon';

// const TOOLTIP_OFFSET = { left: 8, top: 0 };

const Div = styled.div`
  border-right: 1px solid rgba(0, 0, 0, 0.2);

  .editor-default-layout-sidebar {
    &-tabs {
      display: flex;
      width: 100%;
      height: 100%;
    }

    &-headers {
      padding: 4px;
      align-items: center;
      background-color: rgb(238, 238, 238);
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }

    &-header {
      padding: 2px;
    }

    &-content {
      padding: 8px;
      display: none;
      overflow: auto;

      &-opened {
        display: block;
      }
    }
  }
`;

const Sidebar = ({ store, thumbnailTabContent, tabs }) => {
  // const l10n = useContext(LocalizationContext);
  const [opened, setOpened] = useState(false);
  const [currentTab, setCurrentTab] = useState(store.get('currentTab') || 0);

  const defaultTabs = [
    {
      content: thumbnailTabContent,
      icon: <ThumbnailIcon />
      // title: (
      //   <>
      //     {l10n && l10n.defaultLayout ? l10n.defaultLayout.thumbnail : '썸네일'}
      //   </>
      // )
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
    <Div
      className={`editor-default-layout-sidebar ${
        opened ? 'editor-default-layout-sidebar-opened' : ''
      }`}
    >
      <div className="editor-default-layout-sidebar-tabs">
        <div className="editor-default-layout-sidebar-headers">
          {listTabs.map((tab, index) => (
            <div key={index} className="editor-default-layout-sidebar-header">
              {/* <Tooltip
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
              /> */}
              <Button
                onClick={() => switchToTab(index)}
                isSelected={currentTab === index}
              >
                {tab.icon}
              </Button>
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
    </Div>
  );
};

export default Sidebar;
