import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#C19A6B", // camel
    },
    secondary: {
      main: "#F5F5DC", // beige
    },
    background: {
      default: "#FAFAF7", // fondo claro
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2E2E2E",
      secondary: "#5C5C5C",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    body1: { fontSize: "1rem" },
  },
  shape: {
    borderRadius: 12, // bordes suaves
  },
});

export default theme;
