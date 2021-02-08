import ZoomOutButton from './ZoomOutButton';
import { useZoom } from '../hooks/useZoom';
import { decrease } from '../core/zoom/zoomingLevel';

const ZoomOut = ({ children, store }) => {
  const { scale } = useZoom(store);

  const zoomIn = () => {
    const zoom = store.get('zoom');
    if (zoom) {
      const newLevel = decrease(scale);
      zoom(newLevel);
    }
  };

  const defaultChildren = (props) => <ZoomOutButton onClick={props.onClick} />;
  const render = children || defaultChildren;

  return render({
    onClick: zoomIn
  });
};

export default ZoomOut;
