import { ThemeProvider } from "@mui/material/styles";
import Home from "./components/Home/Home";
import { DARK_THEME } from "./themes/darkTheme";

function App() {
  return (
    <ThemeProvider theme={DARK_THEME}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
