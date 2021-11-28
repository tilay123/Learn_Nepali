import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
export default function ExampleText({ example }) {
  return (
    <Paper sx={{ my: 2, p: 3, rounded: true }} variant="outlined">
      <Typography>English: {example.english}</Typography>
      <Typography>Nepali: {example.nepali}</Typography>
      <Typography>Transliteration: {example.transliteration}</Typography>
    </Paper>
  );
}
