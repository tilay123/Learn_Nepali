import * as React from "react";
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
export default function AuthDialogContent({ toggleDialog }) {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <DialogContent>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Sign In" />
          <Tab value="two" label="Sign Up" />
          <IconButton
            sx={{ ml: "auto", p: 2 }}
            aria-label="close"
            onClick={toggleDialog}
          >
            <CloseIcon />
          </IconButton>
        </Tabs>

        <Box component="form" sx={{ m: 2 }}>
          {value === "one" && (
            <>
              <TextField
                sx={{ mb: 1 }}
                label="Email"
                variant="outlined"
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <Button sx={{ mt: 1 }} variant="outlined">
                Submit
              </Button>
              <GoogleSignInButton />
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
