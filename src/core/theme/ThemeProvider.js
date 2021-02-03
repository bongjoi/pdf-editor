import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children, prefixClass }) => {
  return (
    <ThemeContext.Provider value={{ prefixClass: prefixClass || 'pdf-editor' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
