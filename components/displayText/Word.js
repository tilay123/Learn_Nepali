import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
export default function Word({ word }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4">{word.nepali}</Typography>
      <Typography variant="body2">
        Transliteration: {word.transliteration}
      </Typography>
      {word.english && (
        <Typography variant="body2">Meaning: {word.english}</Typography>
      )}
      <Typography variant="body1" mt={1}>
        {word.description}
      </Typography>
    </Box>
  );
}
