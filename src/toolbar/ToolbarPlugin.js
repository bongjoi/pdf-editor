import Toolbar from './Toolbar';
import { pageNavigationPlugin } from '../page-navigation';
import { zoomPlugin } from '../zoom';
import { addLayerPlugin } from '../add-layer';

const ToolbarPlugin = () => {
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin();
  const addLayerPluginInstance = addLayerPlugin();

  const plugins = [
    pageNavigationPluginInstance,
    zoomPluginInstance,
    addLayerPluginInstance
  ];

  const ToolbarDecorator = (props) => {
    const {
      CurrentPageInput,
      CurrentPageLabel,
      GoToFirstPage,
      GoToLastPage,
      GoToNextPage,
      GoToPreviousPage
    } = pageNavigationPluginInstance;
    const { CurrentScale, Zoom, ZoomIn, ZoomOut } = zoomPluginInstance;
    const {
      AddTextLayer,
      AddSignatureLayer,
      AddCheckLayer,
      AddImageLayer
    } = addLayerPluginInstance;

    const NumberOfPages = () => (
      <CurrentPageLabel>
        {(props) => <>{props.numberOfPages}</>}
      </CurrentPageLabel>
    );

    return (
      <Toolbar
        {...props}
        slot={{
          CurrentPageInput,
          CurrentPageLabel,
          CurrentScale,
          GoToFirstPage,
          GoToLastPage,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          AddTextLayer,
          AddSignatureLayer,
          AddCheckLayer,
          AddImageLayer,
          Zoom,
          ZoomIn,
          ZoomOut
        }}
      />
    );
  };

  return {
    pageNavigationPluginInstance,
    zoomPluginInstance,
    addLayerPluginInstance,
    install: (pluginFunctions) => {
      plugins.forEach((plugin) => {
        if (plugin.install) {
          plugin.install(pluginFunctions);
        }
      });
    },
    renderViewer: (props) => {
      let { slot } = props;
      plugins.forEach((plugin) => {
        if (plugin.renderViewer) {
          slot = plugin.renderViewer({ ...props, slot });
        }
      });
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
    },
    Toolbar: ToolbarDecorator
  };
};

export default ToolbarPlugin;
