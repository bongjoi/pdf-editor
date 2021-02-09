import { useContext } from 'react';
import styled from 'styled-components/macro';
import ThemeContext from '../theme/ThemeContext';

const ButtonEl = styled.button`
  padding: 8px;
  color: rgb(255, 255, 255);
  background-color: rgb(53, 126, 221);
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const PrimaryButton = ({ children, onClick }) => {
  const theme = useContext(ThemeContext);

  return (
    <ButtonEl
      className={`${theme.prefixClass}-primary-button`}
      onClick={onClick}
    >
      {children}
    </ButtonEl>
  );
};

export default PrimaryButton;
