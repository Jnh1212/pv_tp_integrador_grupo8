import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useModoAhorro } from "./ModoAhorroContext";

const AppTema = ({ children }) => {
  const { modoAhorro } = useModoAhorro();

  const theme = createTheme({
    palette: {
      mode: modoAhorro ? "dark" : "light",
      primary: {
        main: modoAhorro ? "#90caf9" : "#1a237e",
      },
      background: {
        default: modoAhorro ? "#121212" : "#f5f5f5",
        paper: modoAhorro ? "#1e1e1e" : "#ffffff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTema;