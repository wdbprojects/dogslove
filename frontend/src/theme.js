import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Barlow", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      light: "#757CE8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#af52bf",
      main: "#9c27b0",
      dark: "#6d1b7b",
      contrastText: "#FFF",
    },
    info: {
      light: "#7f97a2",
      main: "#607d8b",
      dark: "#435761",
      contrastText: "#FFF",
    },
    success: {
      light: "#66FFA8",
      main: "#46E88C",
      dark: "#1F9C55",
      contrastText: "#FFF",
    },
    warning: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#FFF",
    },
    background: {
      paper: "#eeeeee",
    },
  },
});

export default theme;
