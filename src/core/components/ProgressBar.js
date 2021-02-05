import { useContext } from 'react';
import ThemeContext from '../theme/ThemeContext';

const ProgressBar = ({ progress }) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={`${theme.prefixClass}-progress-bar`}>
      <div
        className={`${theme.prefixClass}-progress-bar-inner`}
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
