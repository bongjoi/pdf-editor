import { useContext } from 'react';
import styled from 'styled-components/macro';
import ThemeContext from '../theme/ThemeContext';

const Divider = styled.li`
  margin: 4px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const MenuDivider = () => {
  const theme = useContext(ThemeContext);
  return <Divider className={`${theme.prefixClass}-menu-divider`} />;
};

export default MenuDivider;
