import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import { ColorContext } from "../context/ColorModeContext";
const Theme = ({ children }) => {
  const { mode } = useContext(ColorContext);
  console.log("theme.js", mode);
  const theme = createTheme({
    palette: {
      mode,

      primary: {
        main: "#D2042D",
      },
      secondary: {
        main: "#87ceeb",
      },
      ...(mode === "light"
        ? {
            background: {
              default: "#F8F8F8",
            },
          }
        : {}),
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
