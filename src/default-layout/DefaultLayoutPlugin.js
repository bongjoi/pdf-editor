import { useMemo } from 'react';
import styled from 'styled-components/macro';
import Sidebar from './Sidebar';
import { createStore } from '../core';
import { ThumbnailPlugin } from '../thumbnail';
import { ToolbarPlugin } from '../toolbar';

const DefaultLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
`;
const DefaultLayoutToolbar = styled.div`
  background-color: rgba(238, 238, 238);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 4px;
`;
const DefaultLayoutMain = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;
const DefaultLayoutBody = styled.div`
  flex: 1;
  overflow: auto;
`;

const DefaultLayoutPlugin = (props) => {
  const store = useMemo(() => createStore({ currentTab: 0 }), []);
  const thumbnailPluginInstance = ThumbnailPlugin();
  const toolbarPluginInstance = ToolbarPlugin(props ? props.toolbarPlugin : {});

  const { Thumbnails } = thumbnailPluginInstance;
  const { Toolbar } = toolbarPluginInstance;

  const sidebarTabs = props ? props.sidebarTabs : (defaultTabs) => defaultTabs;

  const plugins = [thumbnailPluginInstance, toolbarPluginInstance];

  return {
    thumbnailPluginInstance,
    toolbarPluginInstance,
    activateTab: (index) => {
      store.update('currentTab', index);
    },
    install: (pluginFunctions) => {
      plugins.forEach((plugin) => {
        if (plugin.install) {
          plugin.install(pluginFunctions);
        }
      });
    },
    renderViewer: (renderProps) => {
      let { slot } = renderProps;
      plugins.forEach((plugin) => {
        if (plugin.renderViewer) {
          slot = plugin.renderViewer({ ...renderProps, slot });
        }
      });

      const mergeSubSlot =
        slot.subSlot && slot.subSlot.attrs
          ? {
              ref: slot.subSlot.attrs.ref,
              style: slot.subSlot.attrs.style
            }
          : {};

      slot.children = (
        <DefaultLayoutContainer>
          <DefaultLayoutToolbar>
            {props && props.renderToolbar ? (
              props.renderToolbar(Toolbar)
            ) : (
              <Toolbar />
            )}
          </DefaultLayoutToolbar>
          <DefaultLayoutMain>
            <Sidebar
              store={store}
              thumbnailTabContent={<Thumbnails />}
              tabs={sidebarTabs}
            />
            <DefaultLayoutBody {...mergeSubSlot}>
              {slot.subSlot.children}
            </DefaultLayoutBody>
          </DefaultLayoutMain>
          {slot.children}
        </DefaultLayoutContainer>
      );

      slot.subSlot.attrs = {};
      slot.subSlot.children = <></>;

      return slot;
    },
    uninstall: (pluginFunctions) => {
      plugins.forEach((plugin) => {
        if (plugin.uninstall) {
          plugin.uninstall(pluginFunctions);
        }
      });
    },
    onDocumentLoad: (props) => {
      plugins.forEach((plugin) => {
        if (plugin.onDocumentLoad) {
          plugin.onDocumentLoad(props);
        }
      });
    },
    onTextLayerRender: (props) => {
      plugins.forEach((plugin) => {
        if (plugin.onTextLayerRender) {
          plugin.onTextLayerRender(props);
        }
      });
    },
    onViewerStateChange: (viewerState) => {
      let newState = viewerState;
      plugins.forEach((plugin) => {
        if (plugin.onViewerStateChange) {
          newState = plugin.onViewerStateChange(newState);
        }
      });
      return newState;
    }
  };
};

export default DefaultLayoutPlugin;
