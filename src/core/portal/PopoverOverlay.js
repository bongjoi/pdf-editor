import { useContext } from 'react';
import styled from 'styled-components/macro';
import { useKeyUp } from '../../hooks/useKeyUp';
import ThemeContext from '../theme/ThemeContext';

const Div = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const PopoverOverlay = ({ closeOnEscape, onClose }) => {
  const theme = useContext(ThemeContext);

  useKeyUp(27, () => closeOnEscape && onClose());

  return <Div className={`${theme.prefixClass}-popover-overlay`} />;
};

export default PopoverOverlay;
