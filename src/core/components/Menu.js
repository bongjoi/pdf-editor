import styled from 'styled-components/macro';
const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const Menu = ({ children }) => {
  return <MenuList>{children}</MenuList>;
};

export default Menu;
