// Table for Alphabets
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
export default function TableE({ exampleRows }) {
  // Table for Examples
  return (
    <>
      <TableContainer
        sx={{ mt: 3, mb: 1, mx: 0, minWidth: 240 }}
        component={Paper}
      >
        <Table
          sx={{
            minWidth: 40,
            maxWidth: 300,
          }}
          aria-label="table"
        >
          <TableBody>
            {exampleRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                {row.map((str, idx) => (
                  <TableCell key={idx}>
                    <Typography
                      key={idx}
                      sx={{ fontSize: 20, fontWeight: "400" }}
                    >
                      {str}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

TableE.propTypes = {
  exampleRows: PropTypes.arrayOf(PropTypes.array).isRequired,
};
