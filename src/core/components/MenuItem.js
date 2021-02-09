import { useContext } from 'react';
import styled from 'styled-components/macro';
import CheckIcon from '../icons/CheckIcon';
import ThemeContext from '../theme/ThemeContext';

const Item = styled.li`
  padding: 4px 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .editor-menu-item {
    &-icon {
      padding-left: 16px;
      padding-right: 8px;
    }

    &-label {
      padding-right: 32px;
      flex-grow: 1;
      flex-shrink: 1;
      white-space: nowrap;
    }

    &-check {
      padding-right: 16px;
    }
  }
`;

const MenuItem = ({ checked = false, children, icon = null, onClick }) => {
  const theme = useContext(ThemeContext);

  return (
    <Item className={`${theme.prefixClass}-menu-item`} onClick={onClick}>
      <div className={`${theme.prefixClass}-menu-item-icon`}>{icon}</div>
      <div className={`${theme.prefixClass}-menu-item-label`}>{children}</div>
      <div className={`${theme.prefixClass}-menu-item-check`}>
        {checked && <CheckIcon />}
      </div>
    </Item>
  );
};

export default MenuItem;
