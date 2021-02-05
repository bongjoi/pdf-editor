import { useMemo } from 'react';
import { createStore } from '../core';
import Print from './Print';
import PrintButton from './PrintButton';
import PrintContainer from './PrintContainer';
import PrintStatus from './PrintStatus';

const PrintPlugin = () => {
  const store = useMemo(
    () => createStore({ printStatus: PrintStatus.Inactive }),
    []
  );

  const PrintDecorator = (props) => <Print {...props} store={store} />;

  const PrintButtonDecorator = () => (
    <PrintDecorator>{(props) => <PrintButton {...props} />}</PrintDecorator>
  );

  const renderViewer = (props) => {
    const { slot } = props;
    const updateSlot = {
      children: (
        <>
          <PrintContainer
            doc={props.doc}
            pageWidth={props.pageWidth}
            pageHeight={props.pageHeight}
            rotation={props.rotation}
            store={store}
          />
          {slot.children}
        </>
      )
    };
    return { ...slot, ...updateSlot };
  };

  return {
    renderViewer,
    Print: PrintDecorator,
    PrintButton: PrintButtonDecorator
  };
};

export default PrintPlugin;
