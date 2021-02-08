import { useZoom } from '../hooks/useZoom';

const CurrentScale = ({ children, store }) => {
  const { scale } = useZoom(store);

  const defaultChildren = (props) => <>{`${Math.round(props.scale * 100)}%`}</>;
  const render = children || defaultChildren;

  return render({ scale });
};

export default CurrentScale;
