import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
const Footer = () => {
  return (
    <Container sx={{ mt: 5, mb: 8 }}>
      <Divider sx={{ mb: 5 }}></Divider>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", flexDirection: "column", ml: "auto" }}>
          <Typography fontWeight="700">About</Typography>
          <Link href="#">About Us</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Privacy Policy</Link>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", mx: 3 }}>
          <Typography fontWeight="700">Help &amp; Support</Typography>
          <Link href="#">Contact Us</Link>
          <Link href="#">Help</Link>
          <Link href="#">FAQ</Link>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", mx: 3 }}>
          <Typography fontWeight="700">Features</Typography>
          <Link href="#">Read&amp;Write</Link>
          <Link href="#">Vocabulary</Link>
          <Link href="#">Grammar</Link>
          <Link href="#">Q&amp;A</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
