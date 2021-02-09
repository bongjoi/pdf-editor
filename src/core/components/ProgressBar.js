import { useContext } from 'react';
import styled from 'styled-components/macro';
import ThemeContext from '../theme/ThemeContext';

const Div = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 9999px;

  .editor-progress-bar-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    color: rgb(255, 255, 255);
    background-color: rgb(53, 126, 221);
    border-radius: 9999px;
  }
`;

const ProgressBar = ({ progress }) => {
  const theme = useContext(ThemeContext);

  return (
    <Div className={`${theme.prefixClass}-progress-bar`}>
      <div
        className={`${theme.prefixClass}-progress-bar-inner`}
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </Div>
  );
};

export default ProgressBar;
