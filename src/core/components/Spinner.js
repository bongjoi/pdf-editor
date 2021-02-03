import { useContext } from 'react';
import ThemeContext from '../theme/ThemeContext';

const Spinner = () => {
  const theme = useContext(ThemeContext);

  return (
    <svg
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
    </svg>
  );
};

export default Spinner;
