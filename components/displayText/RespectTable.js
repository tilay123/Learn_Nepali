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

export default function RespectTable({ data }) {
  return (
    <>
      <Typography variant="h4" mt={6}>
        {data.title}
      </Typography>

      <Typography variant="body1" mb={2}>
        {data.description1}
      </Typography>

      <TableContainer sx={{ mb: 3 }} component={Paper}>
        <Table sx={{ minWidth: 20 }} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Count</TableCell>
              <TableCell align="left">Low Respect</TableCell>
              <TableCell align="left">Moderate Respect</TableCell>
              <TableCell align="left">High Respect</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle1">{row[0].nepali}</Typography>
                  <Typography variant="caption">
                    {row[0].transliteration}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography key={row.name}>{row[1].nepali}</Typography>
                  <Typography key={row.name} variant="caption">
                    {row[1].transliteration}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography>{row[2].nepali}</Typography>
                  <Typography variant="caption">
                    {row[2].transliteration}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

RespectTable.propTypes = {
  data: PropTypes.object.isRequired,
};
