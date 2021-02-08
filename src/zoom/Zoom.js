import { useZoom } from '../hooks/useZoom';
import ZoomPopover from './ZoomPopover';

const Zoom = ({ children, store }) => {
  const { scale } = useZoom(store);

  const zoomTo = (newLevel) => {
    const zoom = store.get('zoom');
    if (zoom) {
      zoom(newLevel);
    }
  };

  const defaultChildren = (props) => (
    <ZoomPopover scale={props.scale} onZoom={props.onZoom} />
  );
  const render = children || defaultChildren;

  return render({
    scale,
    onZoom: zoomTo
  });
};

export default Zoom;
