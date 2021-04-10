import { createContext, useContext, useEffect, useState } from 'react';

import theme from './theme';
import { getCurrentTheme } from './utils';

const defaultTheme = theme.xl;
const themeContext = createContext(defaultTheme);

export const useTheme = () => useContext(themeContext);

const ThemeProvider = ({ children }) => {
  // Use XL theme for SSR and client-side hydration
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  useEffect(() => {
    // Initialize correct theme on the client side
    setCurrentTheme(getCurrentTheme());

    const handleResize = () => setCurrentTheme(getCurrentTheme());

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <themeContext.Provider value={currentTheme}>{children}</themeContext.Provider>;
};

export default ThemeProvider;
