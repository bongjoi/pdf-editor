import { useContext } from 'react';
import ThemeContext from '../theme/ThemeContext';

const PrimaryButton = ({ children, onClick }) => {
  const theme = useContext(ThemeContext);

  return (
    <button className={`${theme.prefixClass}-primary-button`} onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryButton;
