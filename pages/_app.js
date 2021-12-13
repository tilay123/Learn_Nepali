import CssBaseline from "@mui/material/CssBaseline";
import Theme from "../theme/Theme";
import ColorModeContextProvider from "../context/ColorModeContext";
import QuestionContextProvider from "../context/QuestionContext";
import AuthProvider from "../context/AuthContext";
import MyAppBar from "../components/MyAppBar";
import { AuthContext } from "../context/AuthContext";
function MyApp({ Component, pageProps }) {
  return (
    <ColorModeContextProvider>
      <AuthProvider>
        <QuestionContextProvider>
          <Theme>
            <CssBaseline></CssBaseline>
            <MyAppBar />
            <Component {...pageProps} />
          </Theme>
        </QuestionContextProvider>
      </AuthProvider>
    </ColorModeContextProvider>
  );
}

export default MyApp;
