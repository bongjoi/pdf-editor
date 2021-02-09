import { useContext } from 'react';
import ThemeContext from '../theme/ThemeContext';

const Menu = ({ children }) => {
  const theme = useContext(ThemeContext);

  return <ul className={`${theme.prefixClass}-menu`}>{children}</ul>;
};

export default Menu;
