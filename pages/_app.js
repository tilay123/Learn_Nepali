import Link from "next/link";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "../theme/Theme";
import DarkModeSwitch from "../components/DarkModeSwitch";
import ColorModeContextProvider from "../context/ColorModeContext";
import QuestionContextProvider from "../context/QuestionContext";
function MyApp({ Component, pageProps }) {
  return (
    <ColorModeContextProvider>
      <QuestionContextProvider>
        <Theme>
          <CssBaseline></CssBaseline>
          <AppBar position="static" sx={{ ml: 0, mr: 0 }}>
            <Toolbar sx={{ ml: 0, mr: 0 }}>
              <Link href="/" passHref>
                <MuiLink underline="none">
                  <Typography variant="h5" component="div" color="white">
                    Learn Nepali
                  </Typography>
                </MuiLink>
              </Link>
              <DarkModeSwitch />
            </Toolbar>
          </AppBar>

          <Component {...pageProps} />
        </Theme>
      </QuestionContextProvider>
    </ColorModeContextProvider>
  );
}

export default MyApp;
