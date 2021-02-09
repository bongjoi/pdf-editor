import { useContext } from 'react';
import styled from 'styled-components/macro';
import ThemeContext from '../theme/ThemeContext';

const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const Menu = ({ children }) => {
  const theme = useContext(ThemeContext);

  return (
    <MenuList className={`${theme.prefixClass}-menu`}>{children}</MenuList>
  );
};

export default Menu;
