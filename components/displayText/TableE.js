import PropTypes from "prop-types";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function TableE({ exampleRows }) {
  // Table for Examples
  return (
    <>
      <TableContainer sx={{ mt: 3, mb: 1 }} component={Paper}>
        <Table
          sx={{
            minWidth: 20,
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
                    <Typography key={idx}>{str}</Typography>
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
