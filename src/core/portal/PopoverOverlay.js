import styled from 'styled-components/macro';
import { useKeyUp } from '../../hooks/useKeyUp';

const PopoverOverlayBlock = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const PopoverOverlay = ({ closeOnEscape, onClose }) => {
  useKeyUp(27, () => closeOnEscape && onClose());

  return <PopoverOverlayBlock />;
};

export default PopoverOverlay;
