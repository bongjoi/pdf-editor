import { createRef } from 'react';
import { ToggleStatus } from '../../hooks/useToggle';
import Portal from './Portal';
import TooltipBody from './TooltipBody';

const Tooltip = ({ content, offset, position, target }) => {
  const targetRef = createRef();

  const renderTarget = (toggle) => {
    const show = () => {
      toggle(ToggleStatus.Open);
    };
    const hide = () => {
      toggle(ToggleStatus.Close);
    };
    return (
      <div ref={targetRef} onMouseEnter={show} onMouseLeave={hide}>
        {target}
      </div>
    );
  };

  const renderContent = () => (
    <TooltipBody offset={offset} position={position} targetRef={targetRef}>
      {content()}
    </TooltipBody>
  );

  return <Portal target={renderTarget} content={renderContent} />;
};

export default Tooltip;
