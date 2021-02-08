import styled from 'styled-components/macro';

const ProgressBarBlock = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
  .inner {
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
  return (
    <ProgressBarBlock>
      <div className="inner" style={{ width: `${progress}%` }}>
        {progress}%
      </div>
    </ProgressBarBlock>
  );
};

export default ProgressBar;
