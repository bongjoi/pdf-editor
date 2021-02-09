import { useContext, createRef } from 'react';
import styled from 'styled-components/macro';
import Arrow from './Arrow';
import ThemeContext from '../theme/ThemeContext';
import { usePosition } from '../../hooks/usePosition';

const Div = styled.div`
  position: absolute;
  top: -9999px;
  left: 0;
  max-width: 300px;
  color: #fff;
  text-align: center;
  background: #000;
  border-radius: 4px;
  z-index: 9999;

  .editor-tooltip-body {
    &-arrow {
      background-color: #000;
    }

    &-content {
      padding: 8px;
    }
  }
`;

const TooltipBody = ({ children, offset, position, targetRef }) => {
  const theme = useContext(ThemeContext);
  const contentRef = createRef();
  const anchorRef = createRef();

  usePosition(contentRef, targetRef, anchorRef, position, offset);

  return (
    <>
      <div ref={anchorRef} style={{ left: 0, position: 'absolute', top: 0 }} />
      <Div className={`${theme.prefixClass}-tooltip-body`} ref={contentRef}>
        <Arrow
          customClassName={`${theme.prefixClass}-tooltip-body-arrow`}
          position={position}
        />
        <div className={`${theme.prefixClass}-tooltip-body-content`}>
          {children}
        </div>
      </Div>
    </>
  );
};

export default TooltipBody;
