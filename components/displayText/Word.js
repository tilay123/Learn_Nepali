import Typography from "@mui/material/Typography";
export default function Word({ word }) {
  return (
    <>
      <Typography variant="h4" mt={6}>
        {word.nepali}
      </Typography>
      <Typography variant="body2">
        Transliteration: {word.transliteration}
      </Typography>
      {word.english && (
        <Typography variant="body2">Meaning: {word.english}</Typography>
      )}
      <Typography variant="body1" mt={1}>
        {word.description}
      </Typography>
    </>
  );
}
