import { useContext } from 'react';
import ThemeContext from '../theme/ThemeContext';
import classNames from '../utils/classNames';

const Button = ({ children, isSelected = false, onClick }) => {
  const theme = useContext(ThemeContext);

  return (
    <button
      className={classNames({
        [`${theme.prefixClass}-button`]: true,
        [`${theme.prefixClass}-button-selected`]: isSelected
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
