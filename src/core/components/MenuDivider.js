import styled from 'styled-components/macro';
const MenuItemDivider = styled.li`
  margin: 4px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const MenuDivider = () => {
  return <MenuItemDivider />;
};

export default MenuDivider;
