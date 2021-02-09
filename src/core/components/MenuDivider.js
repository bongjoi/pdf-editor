import { useContext } from 'react';
import ThemeContext from '../theme/ThemeContext';

const MenuDivider = () => {
  const theme = useContext(ThemeContext);
  return <li className={`${theme.prefixClass}-menu-divider`} />;
};

export default MenuDivider;
