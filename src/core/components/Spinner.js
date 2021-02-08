import styled, { keyframes } from 'styled-components/macro';

const spinnerTransform = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const SpinnerElement = styled.svg`
  animation-duration: 750ms;
  animation-name: ${spinnerTransform};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transition-property: transform;
  .circle {
    fill: none;
    stroke: rgba(0, 0, 0, 0.4);
    stroke-linecap: round;
    stroke-width: 2;
  }
`;

const Spinner = () => {
  return (
    <SpinnerElement width="64px" height="64px" viewBox="0 0 32 32">
      <circle
        className="circle"
        cx="16"
        cy="16"
        r="12"
        strokeDasharray={Math.PI * 2 * 9}
      />
    </SpinnerElement>
  );
};

export default Spinner;
