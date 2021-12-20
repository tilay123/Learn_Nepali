import CssBaseline from "@mui/material/CssBaseline";
import Theme from "../theme/Theme";
import ColorModeContextProvider from "../context/ColorModeContext";
import AuthProvider from "../context/AuthContext";
import MyAppBar from "../components/MyAppBar";
function MyApp({ Component, pageProps }) {
  return (
    <ColorModeContextProvider>
      <AuthProvider>
        <Theme>
          <CssBaseline></CssBaseline>
          <MyAppBar />
          <Component {...pageProps} />
        </Theme>
      </AuthProvider>
    </ColorModeContextProvider>
  );
}

export default MyApp;
