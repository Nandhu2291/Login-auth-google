// ThemeContext.js
import React, { createContext, useState, useContext } from "react";
import { createTheme } from "@mui/material/styles";

// Define color options for the themes
const themes = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
      secondary: { main: '#f50057' },
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#90caf9' },
      secondary: { main: '#ff4081' },
    },
  }),
  green: createTheme({
    palette: {
      primary: { main: '#4caf50' },
      secondary: { main: '#388e3c' },
    },
  }),
  purple: createTheme({
    palette: {
      primary: { main: '#9c27b0' },
      secondary: { main: '#7b1fa2' },
    },
  }),
  orange: createTheme({
    palette: {
      primary: { main: '#ff9800' },
      secondary: { main: '#f57c00' },
    },
  }),
};

// Create the ThemeContext
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.light); // Default theme is 'light'

  const changeTheme = (themeName) => {
    setCurrentTheme(themes[themeName]);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
