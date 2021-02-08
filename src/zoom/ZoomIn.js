import ZoomInButton from './ZoomInButton';
import { useZoom } from '../hooks/useZoom';
import { increase } from '../core/zoom/zoomingLevel';

const ZoomIn = ({ children, store }) => {
  const { scale } = useZoom(store);

  const zoomIn = () => {
    const zoom = store.get('zoom');
    if (zoom) {
      const newLevel = increase(scale);
      zoom(newLevel);
    }
  };

  const defaultChildren = (props) => <ZoomInButton onClick={props.onClick} />;
  const render = children || defaultChildren;

  return render({
    onClick: zoomIn
  });
};

export default ZoomIn;
