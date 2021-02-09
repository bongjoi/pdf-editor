import Toolbar from './Toolbar';
import { pageNavigationPlugin } from '../page-navigation';
import { zoomPlugin } from '../zoom';

const ToolbarPlugin = (props) => {
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const zoomPluginInstance = zoomPlugin();

  const plugins = [pageNavigationPluginInstance, zoomPluginInstance];

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
