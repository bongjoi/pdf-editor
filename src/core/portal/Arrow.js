import { useContext } from 'react';
import styled from 'styled-components/macro';
import Position from './Position';
import ThemeContext from '../theme/ThemeContext';
import classNames from '../utils/classNames';

const ArrowEl = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-top-color: rgba(0, 0, 0, 0.3);
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  border-left-color: rgba(0, 0, 0, 0.3);
  z-index: 0;

  .editor-arrow {
    &-tl {
      bottom: 0;
      left: 0;
      transform: translate(50%, 50%) rotate(45deg);
    }

    &-tc {
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%) rotate(45deg);
    }

    &-tr {
      bottom: 0;
      right: 0;
      transform: translate(-50%, 50%) rotate(45deg);
    }

    &-rt {
      left: 0;
      top: 0;
      transform: translate(-50%, 50%) rotate(135deg);
    }

    &-rc {
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%) rotate(135deg);
    }

    &-rb {
      bottom: 0;
      left: 0;
      transform: translate(-50%, -50%) rotate(135deg);
    }

    &-bl {
      left: 0;
      top: 0;
      transform: translate(50%, -50%) rotate(225deg);
    }

    &-bc {
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%) rotate(225deg);
    }

    &-br {
      right: 0;
      top: 0;
      transform: translate(-50%, -50%) rotate(225deg);
    }

    &-lt {
      right: 0;
      top: 0;
      transform: translate(50%, 50%) rotate(315deg);
    }

    &-lc {
      right: 0;
      top: 50%;
      transform: translate(50%, -50%) rotate(315deg);
    }

    &-lb {
      bottom: 0;
      right: 0;
      transform: translate(50%, -50%) rotate(315deg);
    }
  }
`;

const Arrow = ({ customClassName, position }) => {
  const theme = useContext(ThemeContext);

  return (
    <ArrowEl
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
    ></ArrowEl>
  );
};

export default Arrow;
