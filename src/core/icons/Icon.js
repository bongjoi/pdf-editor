import { useContext } from 'react';
import styled from 'styled-components/macro';
import ThemeContext from '../theme/ThemeContext';

const SvgEl = styled.svg`
  fill: none;
  stroke: rgb(0, 0, 0);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1;
  text-align: center;
`;

const Icon = ({ children, size = 24 }) => {
  const theme = useContext(ThemeContext);
  const width = `${size || 24}px`;

  return (
    <SvgEl
      className={`${theme.prefixClass}-icon`}
      height={width}
      viewBox="0 0 24 24"
      width={width}
    >
      {children}
    </SvgEl>
  );
};

export default Icon;
