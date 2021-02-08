import RotateButton from './RotateButton';
import RotateDirection from './RotateDirection';
import { useRotation } from '../hooks/useRotation';

const Rotate = ({ children, direction, store }) => {
  const { rotation } = useRotation(store);

  const onClick = () => {
    const rotate = store.get('rotate');
    if (rotate) {
      const degrees = direction === RotateDirection.Backward ? -90 : 90;
      const updateRotation =
        rotation === 360 || rotation === -360 ? degrees : rotation + degrees;
      rotate(updateRotation);
    }
  };

  const defaultChildren = (props) => (
    <RotateButton direction={props.direction} onClick={props.onClick} />
  );
  const render = children || defaultChildren;

  return render({
    direction,
    onClick
  });
};

export default Rotate;
