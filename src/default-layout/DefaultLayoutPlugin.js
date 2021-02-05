import { useMemo } from 'react';
import Sidebar from './Sidebar';
import { createStore } from '../core';
import { ThumbnailPlugin } from '../thumbnail';
import { ToolbarPlugin } from '../toolbar';

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
        <div className="pdf-editor-default-layout-container">
          <div className="pdf-editor-default-layout-toolbar">
            {props && props.renderToolbar ? (
              props.renderToolbar(Toolbar)
            ) : (
              <Toolbar />
            )}
          </div>
          <div className="pdf-editor-default-layout-main">
            <Sidebar
              store={store}
              thumbnailTabContent={<Thumbnails />}
              tabs={sidebarTabs}
            />
            <div className="pdf-editor-default-layout-body" {...mergeSubSlot}>
              {slot.subSlot.children}
            </div>
          </div>
          {slot.children}
        </div>
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
