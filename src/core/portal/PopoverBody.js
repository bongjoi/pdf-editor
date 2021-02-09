import { useContext, createRef } from 'react';
import styled from 'styled-components/macro';
import Arrow from './Arrow';
import ThemeContext from '../theme/ThemeContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { usePosition } from '../../hooks/usePosition';

const Div = styled.div`
  padding: 8px 0;
  position: absolute;
  top: -9999px;
  left: 0;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  z-index: 9999;

  .editor-popover-body-arrow {
    background: rgb(255, 255, 255);
  }
`;

const PopoverBody = ({
  children,
  closeOnClickOutside,
  offset,
  position,
  targetRef,
  onClose
}) => {
  const theme = useContext(ThemeContext);
  const contentRef = createRef();
  const anchorRef = createRef();

  useClickOutside(closeOnClickOutside, contentRef, onClose);
  usePosition(contentRef, targetRef, anchorRef, position, offset);

  return (
    <>
      <div ref={anchorRef} style={{ left: 0, position: 'absolute', top: 0 }} />
      <Div className={`${theme.prefixClass}-popover-body`} ref={contentRef}>
        <Arrow
          customClassName={`${theme.prefixClass}-popover-body-arrow`}
          position={position}
        />
        {children}
      </Div>
    </>
  );
};

export default PopoverBody;
