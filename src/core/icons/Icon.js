import { useContext } from 'react';
import ThemeContext from '../theme/ThemeContext';

const Icon = ({ children, size = 24 }) => {
  const theme = useContext(ThemeContext);
  const width = `${size || 24}px`;

  return (
    <svg
      className={`${theme.prefixClass}-icon`}
      height={width}
      viewBox="0 0 24 24"
      width={width}
    >
      {children}
    </svg>
  );
};

export default Icon;
