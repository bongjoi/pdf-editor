import { createRef } from 'react';
import styled from 'styled-components/macro';
import Arrow from './Arrow';
import { useClickOutside } from '../../hooks/useClickOutside';
import { usePosition } from '../../hooks/usePosition';

const PopoverBodyBlock = styled.div`
  padding: 8px 0;
  position: absolute;
  top: -9999px;
  left: 0;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  z-index: 9999;
  .arrow {
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
  const contentRef = createRef();
  const anchorRef = createRef();

  useClickOutside(closeOnClickOutside, contentRef, onClose);
  usePosition(contentRef, targetRef, anchorRef, position, offset);

  return (
    <>
      <div ref={anchorRef} style={{ left: 0, position: 'absolute', top: 0 }} />
      <PopoverBodyBlock ref={contentRef}>
        <Arrow customClassName="arrow" position={position} />
        {children}
      </PopoverBodyBlock>
    </>
  );
};

export default PopoverBody;
