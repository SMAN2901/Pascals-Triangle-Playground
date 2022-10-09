import { ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import Home from "./components/Home/Home";
import { getThemeFromStorage, saveThemeToStorage } from "./services/SettingsDataService";
import { DARK_THEME } from "./themes/darkTheme";
import { LIGHT_THEME } from "./themes/lightTheme";

function App() {
  const themes: {[name: string]: ThemeOptions} = {
    light: LIGHT_THEME,
    dark: DARK_THEME
  };

  const [themeName, setThemeName] = useState<string>(() => getThemeFromStorage());

  const changeTheme = (name: string) => {
    setThemeName(themes[name] ? name : "dark");
    saveThemeToStorage(themes[name] ? name : "dark");
  }

  return (
    <ThemeProvider theme={themes[themeName]}>
      <Home changeTheme={changeTheme}/>
    </ThemeProvider>
  );
}

export default App;
