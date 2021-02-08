import styled from 'styled-components/macro';

const ToobarBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  .left {
    display: flex;
    align-items: center;
  }
  .center {
    display: flex;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 1;
    justify-content: center;
  }
  .right {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  .item {
    padding: 0 2px;
  }
`;

const DefaultToolbar = (toolbarSlot) => {
  const {
    CurrentPageInput,
    GoToFirstPage,
    GoToNextPage,
    GoToPreviousPage,
    GoToLastPage,
    NumberOfPages,
    Zoom,
    ZoomIn,
    ZoomOut
  } = toolbarSlot;

  return (
    <ToobarBlock>
      <div className="left">
        <div className="item">
          <GoToFirstPage />
        </div>
        <div className="item">
          <GoToPreviousPage />
        </div>
        <div className="item">
          <CurrentPageInput /> / <NumberOfPages />
        </div>
        <div className="item">
          <GoToNextPage />
        </div>
        <div className="item">
          <GoToLastPage />
        </div>
      </div>
      <div className="center"></div>
      <div className="right">
        <div className="item">
          <ZoomOut />
        </div>
        <div className="item">
          <Zoom />
        </div>
        <div className="item">
          <ZoomIn />
        </div>
      </div>
    </ToobarBlock>
  );
};

export default DefaultToolbar;
