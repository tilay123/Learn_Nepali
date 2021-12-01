import Typography from "@mui/material/Typography";
import Word from "../components/displayText/Word";
import RespectTable from "../components/displayText/RespectTable";
import ExampleText from "../components/displayText/ExampleText";
import TableE from "../components/displayText/TableE";
import Alphabet from "../components/displayText/Alphabet";
export default function Displayer({ data }) {
  switch (data.type) {
    case "word":
      return <Word word={data} />;
    case "text":
      return <Typography sx={{ mb: 3 }}>{data.text}</Typography>;
    case "subtitle":
      return (
        <Typography variant="h4" sx={{ mt: 3, mb: 1, fontWeight: "500" }}>
          {data.text}
        </Typography>
      );

    case "tableR":
      return <RespectTable data={data} />;
    case "tableE":
      return <TableE exampleRows={data.data}></TableE>;
    case "example":
      return <ExampleText example={data} />;
    case "alphabet":
      return <Alphabet data={data} />;
    default:
      return <Typography>{"Data can't be displayed."}</Typography>;
  }
}
