import Typography from "@mui/material/Typography";
import WriteOnCanvas from "../../pages/handwrite/index";
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
export default function Alphabet({ data }) {
  return (
    <Box sx={{ m: 2, p: 2 }}>
      <Typography variant="h3">{data.alphabet}</Typography>
      <WriteOnCanvas small></WriteOnCanvas>

      <Link href="/handwrite" passHref>
        <MuiLink target="_blank">Practice without looking?</MuiLink>
      </Link>
      <Divider sx={{ mt: 2 }}></Divider>
    </Box>
  );
}
