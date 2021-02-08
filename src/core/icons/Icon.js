import styled from 'styled-components/macro';

const IconElement = styled.svg`
  fill: none;
  stroke: rgb(0, 0, 0);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1;
  text-align: center;
`;

const Icon = ({ children, size = 24 }) => {
  const width = `${size || 24}px`;

  return (
    <IconElement width={width} height={width} viewBox="0 0 24 24">
      {children}
    </IconElement>
  );
};

export default Icon;
