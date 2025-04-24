import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => setDark(prev => !prev);

  const theme = {
    isDark: dark,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={dark ? 'dark' : 'light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
