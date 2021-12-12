import Box from "@mui/material/Box";
import Image from "next/image";

export default function GoogleSignInButton() {
  return (
    <Box sx={{ display: "block", my: 1 }}>
      <Image
        src="/assets/btn_google_signin_dark_normal_web.png"
        alt="Sign In with Google"
        width={191}
        height={46}
        onClick={() => console.log("Clicked Google sign")}
      />
    </Box>
  );
}
