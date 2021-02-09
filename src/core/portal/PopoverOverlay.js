import { useContext } from 'react';
import { useKeyUp } from '../../hooks/useKeyUp';
import ThemeContext from '../theme/ThemeContext';

const PopoverOverlay = ({ closeOnEscape, onClose }) => {
  const theme = useContext(ThemeContext);

  useKeyUp(27, () => closeOnEscape && onClose());

  return <div className={`${theme.prefixClass}-popover-overlay`} />;
};

export default PopoverOverlay;
