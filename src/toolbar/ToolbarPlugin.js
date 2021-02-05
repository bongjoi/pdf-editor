import { GetFilePlugin } from '../get-file';
import { PageNavigationPlugin } from '../page-navigation';
import { PrintPlugin } from '../print';

import Toolbar from './Toolbar';

const ToolbarPlugin = (props) => {
  const getFilePluginInstance = GetFilePlugin(props ? props.getFilePlugin : {});
  const pageNavigationPluginInstance = PageNavigationPlugin();
  const printPluginInstance = PrintPlugin();
  const rotatePluginInstance = RotatePlugin();
  const zoomPluginInstance = ZoomPlugin();

  const plugins = [
    getFilePluginInstance,
    pageNavigationPluginInstance,
    printPluginInstance,
    rotatePluginInstance,
    zoomPluginInstance
  ];

  const ToolbarDecorator = (props) => {
    const { Download } = getFilePluginInstance;
    const {
      CurrentPageInput,
      CurrentPageLabel,
      GoToFirstPage,
      GoToFirstPageMenuItem,
      GoToLastPage,
      GoToLastPageMenuItem,
      GoToNextPage,
      GoToPreviousPage
    } = pageNavigationPluginInstance;
    const { Print } = printPluginInstance;
    const {
      Rotate,
      RotateBackwardMenuItem,
      RotateForwardMenuItem
    } = rotatePluginInstance;
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
          Download,
          GoToFirstPage,
          GoToFirstPageMenuItem,
          GoToLastPage,
          GoToLastPageMenuItem,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          Print,
          Rotate,
          RotateBackwardMenuItem,
          RotateForwardMenuItem,
          Zoom,
          ZoomIn,
          ZoomOut
        }}
      />
    );
  };

  return {
    getFilePluginInstance,
    pageNavigationPluginInstance,
    printPluginInstance,
    rotatePluginInstance,
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
