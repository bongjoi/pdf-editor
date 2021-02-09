import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

const WithScale = ({ callback, children, rotation, scale }) => {
  useIsomorphicLayoutEffect(() => {
    callback();
  }, [rotation, scale]);
  return <>{children}</>;
};

export default WithScale;
