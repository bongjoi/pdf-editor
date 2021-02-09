import { useContext } from 'react';
import styled from 'styled-components/macro';
import ThemeContext from '../theme/ThemeContext';
import classNames from '../utils/classNames';

const ButtonEl = styled.button`
  &.editor-button {
    padding: 8px;
    background-color: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &-selected {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const Button = ({ children, isSelected = false, onClick }) => {
  const theme = useContext(ThemeContext);

  return (
    <ButtonEl
      className={classNames({
        [`${theme.prefixClass}-button`]: true,
        [`${theme.prefixClass}-button-selected`]: isSelected
      })}
      onClick={onClick}
    >
      {children}
    </ButtonEl>
  );
};

export default Button;
