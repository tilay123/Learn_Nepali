import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import GoogleSignInButton from "./GoogleSignInButton";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useRef } from "react";
import isEmail from "validator/lib/isEmail";
import { useRouter } from "next/router";

export default function AuthDialogContent({ toggleDialog }) {
  const [value, setValue] = useState("one");

  const {
    state,
    signUp,
    signIn,
    signInWithGoogle,
    addError,
    signOutUser,
    confirmUser,
    loadCurrentUser,
  } = useContext(AuthContext);

  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Typography sx={{ px: 2, pt: 2 }} variant="h5" component="div">
          Learn Nepali
        </Typography>
        <IconButton
          sx={{ ml: "auto", px: 2, pt: 2 }}
          aria-label="close"
          onClick={() => {
            addError(null);
            toggleDialog();
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ mt: 0 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Sign In" />
          <Tab value="two" label="Sign Up" />
        </Tabs>

        <Box component="form" sx={{ m: 2 }}>
          {value === "one" && (
            <>
              <TextField
                sx={{ mb: 1 }}
                label="Email"
                variant="outlined"
                error={errors.email != null}
                helperText={errors.email}
                inputRef={emailRef}
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                error={errors.password}
                helperText={errors.password}
                variant="outlined"
                inputRef={passwordRef}
                fullWidth
              />
              {state.error && (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{ fontWeight: 600, width: "100%" }}
                >
                  {state.error}
                </Typography>
              )}
              <Button
                sx={{ mt: 1 }}
                variant="outlined"
                disabled={loading}
                onClick={async (event) => {
                  event.preventDefault();
                  setLoading(true);

                  if (!isEmail(emailRef.current.value)) {
                    setErrors({ ...errors, email: "Enter a valid email" });
                    //addError("Enter a valid email");
                  } else if (passwordRef.current.value.length < 8) {
                    setErrors({
                      ...errors,
                      password: "Wrong Password.",
                    });
                    // addError("Password must be greater than 8 characters");
                  } else {
                    try {
                      await signIn(
                        emailRef.current.value,
                        passwordRef.current.value
                      ); // if successful, it will redirect to the main page

                      console.log("state.routeUrl", state.routeUrl);
                      if (state.routeUrl) router.replace(state.routeUrl);
                      toggleDialog();

                      return; // returning so that setLoading(..) doesn't get called again ||
                    } catch (error) {
                      //UserNotConfirmedException

                      // If error: we need to call setLoading(false) so that user can submit again.
                      setLoading(false);
                    }
                  }

                  setLoading(false);
                }}
              >
                Submit
              </Button>
              <GoogleSignInButton
                handleSignIn={signInWithGoogle}
                handleRoute={() => {
                  if (state.routeUrl) router.replace(state.routeUrl);
                  toggleDialog();
                }}
              />
            </>
          )}
          {value === "two" && (
            <>
              <TextField
                label="First Name"
                variant="outlined"
                sx={{ mb: 1, mr: 1, width: { xs: "100%", md: "49%" } }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                sx={{ mb: 1, width: { xs: "100%", md: "49%" } }}
              />
              <TextField
                label="Email"
                variant="outlined"
                sx={{ mb: 1 }}
                fullWidth
              />
              <TextField
                label="Password"
                sx={{ mb: 1 }}
                variant="outlined"
                type="password"
                fullWidth
              />
              <TextField
                label="Re-enter Password"
                variant="outlined"
                type="password"
                sx={{ mb: 1 }}
                fullWidth
              />
              <Button variant="outlined">Submit</Button>
            </>
          )}
        </Box>
      </DialogContent>
    </>
  );
}
