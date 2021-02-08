import styled from 'styled-components/macro';
import CheckIcon from '../icons/CheckIcon';

const MenuItemBlock = styled.li`
  padding: 4px 0;
  display: flex;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .icon {
    padding-left: 16px;
    padding-right: 8px;
  }
  .label {
    flex-grow: 1;
    flex-shrink: 1;
    padding-right: 32px;
    white-space: nowrap;
  }
  .check {
    padding-right: 16px;
  }
`;

const MenuItem = ({ checked = false, children, icon = null, onClick }) => {
  return (
    <MenuItemBlock onClick={onClick}>
      <div className="icon">{icon}</div>
      <div className="label">{children}</div>
      <div className="check">{checked && <CheckIcon />}</div>
    </MenuItemBlock>
  );
};

export default MenuItem;
