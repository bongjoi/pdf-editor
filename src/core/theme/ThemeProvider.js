import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children, prefixClass }) => {
  return (
    <ThemeContext.Provider value={{ prefixClass: prefixClass || 'editor' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
