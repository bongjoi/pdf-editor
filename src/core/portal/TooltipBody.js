import React, { createRef } from 'react';
import styled from 'styled-components/macro';
import Arrow from './Arrow';
import { usePosition } from '../../hooks/usePosition';

const TooltipBodyBlock = styled.div`
  position: absolute;
  top: -9999px;
  left: 0;
  max-width: 300px;
  color: #fff;
  text-align: center;
  background: #000;
  border-radius: 4px;
  z-index: 9999;
  .arrow {
    background-color: #000;
  }
  .content {
    padding: 8px;
  }
`;

const TooltipBody = ({ children, offset, position, targetRef }) => {
  const contentRef = createRef();
  const anchorRef = createRef();

  usePosition(contentRef, targetRef, anchorRef, position, offset);

  return (
    <>
      <div ref={anchorRef} style={{ left: 0, position: 'absolute', top: 0 }} />
      <TooltipBodyBlock ref={contentRef}>
        <Arrow customClassName="arrow" position={position} />
        <div className="content">{children}</div>
      </TooltipBodyBlock>
    </>
  );
};

export default TooltipBody;
