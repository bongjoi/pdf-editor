import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import { getResizeDetector } from '../utils/resizeDetector';
import { isEqualToSize, isNumber } from './utils/geometry';

const defaultAutoResizingProps = {
  width: null,
  height: null,
  onResize: () => {}
};

const AutoResizing = React.memo((props) => {
  const { width, height, onResize, children, ...divProps } = props;
  const [size, setSize] = useState(null);
  const fixedSize = useMemo(() => {
    if (!isNumber(width) || !isNumber(height)) {
      return null;
    }

    return { width, height };
  }, [width, height]);
  const resizeRef = useRef(null);
  const delegate = { onResize };
  const delegateRef = useRef(delegate);
  delegateRef.current = delegate;

  useIsomorphicLayoutEffect(() => {
    if (size) {
      delegateRef.current.onResize(size);
    }
  }, [size]);

  useEffect(() => {
    if (fixedSize) {
      return;
    }

    function calculateSize() {
      const node = resizeRef.current;

      if (!node) {
        return;
      }

      const nextSize = {
        width: node.offsetWidth,
        height: node.offsetHeight
      };

      setSize((size) => (isEqualToSize(size, nextSize) ? size : nextSize));
    }

    calculateSize();

    const detector = getResizeDetector();
    const node = resizeRef.current;

    if (detector && node) {
      detector.listenTo(node, calculateSize);

      return () => {
        detector.uninstall(node);
      };
    }

    return;
  }, [fixedSize]);

  useMemo(() => {
    if (fixedSize) {
      setSize((size) => (isEqualToSize(size, fixedSize) ? size : fixedSize));
    }
  }, [fixedSize]);

  const divStyle = useMemo(() => {
    const style = { width: '100%', height: '100%' };

    if (isNumber(width)) {
      style.width = width;
    }
    if (isNumber(height)) {
      style.height = height;
    }

    if (divProps.style) {
      Object.assign(style, divProps.style);
    }

    return style;
  }, [width, height, divProps.style]);

  divProps.style = divStyle;

  let element = null;

  if (size) {
    element = typeof children === 'function' ? children(size) : children;
  }

  return (
    <div {...divProps} ref={resizeRef}>
      {element}
    </div>
  );
});

AutoResizing.defaultProps = defaultAutoResizingProps;

export default AutoResizing;
