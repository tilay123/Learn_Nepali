import Link from "next/link";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "../theme/Theme";
import DarkModeSwitch from "../components/DarkModeSwitch";
import ColorModeContextProvider from "../context/ColorModeContext";
function MyApp({ Component, pageProps }) {
  return (
    <ColorModeContextProvider>
      <Theme>
        <CssBaseline></CssBaseline>
        <AppBar position="static">
          <Toolbar>
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
    </ColorModeContextProvider>
  );
}

export default MyApp;
