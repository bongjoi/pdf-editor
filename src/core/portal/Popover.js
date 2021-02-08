import { createRef } from 'react';
import PopoverBody from './PopoverBody';
import PopoverOverlay from './PopoverOverlay';
import Portal from './Portal';

const Popover = ({
  closeOnClickOutside,
  closeOnEscape,
  content,
  offset,
  position,
  target
}) => {
  const targetRef = createRef();
  const renderTarget = (toggle, opened) => (
    <div ref={targetRef}>{target(toggle, opened)}</div>
  );
  const renderContent = (toggle) => (
    <>
      <PopoverOverlay closeOnEscape={closeOnEscape} onClose={toggle} />
      <PopoverBody
        closeOnClickOutside={closeOnClickOutside}
        offset={offset}
        position={position}
        targetRef={targetRef}
        onClose={toggle}
      >
        {content(toggle)}
      </PopoverBody>
    </>
  );

  return <Portal content={renderContent} target={renderTarget} />;
};

export default Popover;
