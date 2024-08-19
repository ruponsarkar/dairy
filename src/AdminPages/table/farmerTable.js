import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicMenu from "../../ui-component/menu";
import { Button } from "@mui/material";


import Swal from "sweetalert2";

import api from "../../API/api";
import { Padding } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function FarmerTable({ data, getAdmins }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table className="table-bordered table-striped">
          <TableHead>
            <TableRow>
              <StyledTableCell className="p-2 text-center">#</StyledTableCell>
              <StyledTableCell className="p-2 text-center">Farmer Name</StyledTableCell>
              <StyledTableCell className="p-2 text-center">Name of DCS</StyledTableCell>
              <StyledTableCell className="p-2 text-center">Registration No</StyledTableCell>
              <StyledTableCell className="p-2 text-center">District</StyledTableCell>
              {/* <StyledTableCell align="center">Status</StyledTableCell> */}
              <StyledTableCell className="p-2 text-center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data.map((row, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.name}>
                    <TableCell className="p-2 text-center">{index + 1}</TableCell>
                    <TableCell className="p-2 text-center" component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell className="p-2 text-center">{row.dcs_name}</TableCell>
                    <TableCell className="p-2 text-center">{row.dcs_registration_no}</TableCell>
                    <TableCell className="p-2 text-center">{row.district}</TableCell>
                    <TableCell className="p-2 text-center">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        // onClick={() => handleClickOpen(row)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        <div>
          {!data && (
            <div className="text-center p-5">
              <img
            src="../assets/noData.png"
            alt="no data"
            className="govt-logo"
          />
              <p>Data not found</p>
            </div>
          )}
        </div>
      </TableContainer>
    </>
  );
}
