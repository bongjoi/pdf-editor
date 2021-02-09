import { useContext, createRef } from 'react';
import Arrow from './Arrow';
import ThemeContext from '../theme/ThemeContext';
import { useClickOutside } from '../../hooks/useClickOutside';
import { usePosition } from '../../hooks/usePosition';

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
      <div className={`${theme.prefixClass}-popover-body`} ref={contentRef}>
        <Arrow
          customClassName={`${theme.prefixClass}-popover-body-arrow`}
          position={position}
        />
        {children}
      </div>
    </>
  );
};

export default PopoverBody;
