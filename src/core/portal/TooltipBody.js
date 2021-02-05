import React, { useContext, createRef } from 'react';

import { usePosition } from '../../hooks/usePosition';
import ThemeContext from '../theme/ThemeContext';
import Arrow from './Arrow';

const TooltipBody = ({ children, offset, position, targetRef }) => {
  const theme = useContext(ThemeContext);
  const contentRef = createRef();
  const anchorRef = createRef();

  usePosition(contentRef, targetRef, anchorRef, position, offset);

  return (
    <>
      <div ref={anchorRef} style={{ left: 0, position: 'absolute', top: 0 }} />
      <div className={`${theme.prefixClass}-tooltip-body`} ref={contentRef}>
        <Arrow
          customClassName={`${theme.prefixClass}-tooltip-body-arrow`}
          position={position}
        />
        <div className={`${theme.prefixClass}-tooltip-body-content`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default TooltipBody;
