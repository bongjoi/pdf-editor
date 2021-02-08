import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import calculatePosition from '../core/utils/calculatePosition';

export const usePosition = (
  contentRef,
  targetRef,
  anchorRef,
  position,
  offset
) => {
  useIsomorphicLayoutEffect(() => {
    const targetElement = targetRef.current;
    const contentElement = contentRef.current;
    const anchorElement = anchorRef.current;
    if (!contentElement || !targetElement || !anchorElement) return;

    const anchorRect = anchorElement.getBoundingClientRect();
    const { top, left } = calculatePosition(
      contentElement,
      targetElement,
      position,
      offset
    );
    contentElement.style.top = `${top - anchorRect.top}px`;
    contentElement.style.left = `${left - anchorRect.left}px`;
  }, []);
};
