import Link from "next/link";
import { Link as MuiLink } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import DarkModeSwitch from "./DarkModeSwitch";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

export default function MyAppBar() {
  const { state, signOutUser } = useContext(AuthContext);
  return (
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
        {state.user && (
          <Button
            variant="contained"
            endIcon={<LogoutIcon />}
            onClick={signOutUser}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
