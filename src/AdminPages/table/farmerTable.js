import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BasicMenu from "../../ui-component/menu";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import Application from "../../components/register/application";
import Certificate from "../../components/approvel/certificate";

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




export default function FarmerTable({ data, getAdmins, setModalOpen, setApplicationId }) {

  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [opencertificate, setOpencertificate] = useState(false);
  const [openImgView, setOpenImgView] = useState(false);
  const [selectedImg, setSelectedImg] = useState();

  const handleClickOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };
  const handleClickOpenCetificate = (row) => {
    setSelectedRow(row);
    setOpencertificate(true);
  };
  const handleClose = () => {
    setOpen(false);
    // setSelectedRow(null);
  };

  const updateFile = () => {
    setApplicationId(data[0].applicationId)
    setModalOpen(true)
  }


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
              <StyledTableCell className="p-2 text-center">Certificate</StyledTableCell>
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
                        onClick={() => handleClickOpen(row)}
                      >
                        View
                      </Button>
                    </TableCell>

                    <TableCell className="p-2 text-center">
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleClickOpenCetificate(row)}
                      >
                        Download
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



      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="protein-modal-title"
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle id="protein-modal-title"> Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              <Application data={selectedRow} />

              {selectedRow && (
                <div className="documents d-flex justify-content-center border p-3 gap-4">
                  <div className="text-center card">
                    <h3>Pan Card</h3>
                    {/* <a href={`https://milksubsidydairyassam.com:8800/${selectedRow.panCard}`}> */}
                    <img
                      src={`https://milksubsidydairyassam.com:8800/${selectedRow.panCard}`}
                      className="img"
                      alt=""
                      onClick={() => {
                        setOpenImgView(true);
                        setSelectedImg(
                          `https://milksubsidydairyassam.com:8800/${selectedRow.panCard}`
                        );
                      }}
                    />
                    {/* </a> */}
                  </div>
                  <div className="text-center card">
                    <h3>Aadhar Card</h3>
                    <img
                      src={`https://milksubsidydairyassam.com:8800/${selectedRow.aadharCard}`}
                      className="img"
                      alt=""
                      onClick={() => {
                        setOpenImgView(true);
                        setSelectedImg(
                          `https://milksubsidydairyassam.com:8800/${selectedRow.aadharCard}`
                        );
                      }}
                    />
                  </div>
                  <div className="text-center card">
                    <h3>Passbook</h3>
                    <img
                      src={`https://milksubsidydairyassam.com:8800/${selectedRow.passbook}`}
                      className="img"
                      alt=""
                      onClick={() => {
                        setOpenImgView(true);
                        setSelectedImg(
                          `https://milksubsidydairyassam.com:8800/${selectedRow.passbook}`
                        );
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="text-center">
                  <Button onClick={updateFile}>Want to Update Files ?</Button>
                </div>
              </div>

              {/* <div className="d-flex justify-content-center gap-3 m-3">
                <div>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                  >
                    <option value="">---select---</option>
                    <option value="Approve">Approve</option>
                    <option value="Reject">Reject</option>
                  </select>
                </div>
                {status === "Reject" && (
                  <div>
                    <input
                      type="text"
                      onChange={(e) => setRemark(e.target.value)}
                      className="form-control"
                      placeholder="Remark"
                      name=""
                      id=""
                    />
                  </div>
                )}
                <div>
                  <Button
                    variant="contained"
                    onClick={handleUpdate}
                    disabled={status ? false : true}
                  >
                    Submit
                  </Button>
                </div>
              </div> */}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>



      {/* certificate  */}

      <Dialog
        open={opencertificate}
        onClose={() => setOpencertificate(false)}
        aria-labelledby="protein-modal-title"
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle id="protein-modal-title"> Certificate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              {selectedRow &&
                <>
                  <Certificate data={selectedRow} />
                </>
              }


            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpencertificate(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>



    </>
  );
}
