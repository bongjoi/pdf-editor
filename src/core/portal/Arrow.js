import { useContext } from 'react';
import Position from './Position';
import ThemeContext from '../theme/ThemeContext';
import classNames from '../utils/classNames';

const Arrow = ({ customClassName, position }) => {
  const theme = useContext(ThemeContext);

  return (
    <div
      className={classNames({
        [`${theme.prefixClass}-arrow`]: true,
        [`${theme.prefixClass}-arrow-tl`]: position === Position.TopLeft,
        [`${theme.prefixClass}-arrow-tc`]: position === Position.TopCenter,
        [`${theme.prefixClass}-arrow-tr`]: position === Position.TopRight,
        [`${theme.prefixClass}-arrow-rt`]: position === Position.RightTop,
        [`${theme.prefixClass}-arrow-rc`]: position === Position.RightCenter,
        [`${theme.prefixClass}-arrow-rb`]: position === Position.RightBottom,
        [`${theme.prefixClass}-arrow-bl`]: position === Position.BottomLeft,
        [`${theme.prefixClass}-arrow-bc`]: position === Position.BottomCenter,
        [`${theme.prefixClass}-arrow-br`]: position === Position.BottomRight,
        [`${theme.prefixClass}-arrow-lt`]: position === Position.LeftTop,
        [`${theme.prefixClass}-arrow-lc`]: position === Position.LeftCenter,
        [`${theme.prefixClass}-arrow-lb`]: position === Position.LeftBottom,
        [`${customClassName}`]: customClassName !== ''
      })}
    />
  );
};

export default Arrow;
