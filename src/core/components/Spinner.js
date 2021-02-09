import { useContext } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import ThemeContext from '../theme/ThemeContext';

const SpinnerTransform = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SvgEl = styled.svg`
  animation-duration: 750ms;
  animation-name: ${SpinnerTransform};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transition-property: transform;

  .editor-spinner-circle {
    fill: none;
    stroke: rgba(0, 0, 0, 0.4);
    stroke-linecap: round;
    stroke-width: 2;
  }
`;

const Spinner = () => {
  const theme = useContext(ThemeContext);

  return (
    <SvgEl
      className={`${theme.prefixClass}-spinner`}
      width="64px"
      height="64px"
      viewBox="0 0 32 32"
    >
      <circle
        className={`${theme.prefixClass}-spinner-circle`}
        cx="16"
        cy="16"
        r="12"
        strokeDasharray={Math.PI * 2 * 9}
      />
    </SvgEl>
  );
};

export default Spinner;
