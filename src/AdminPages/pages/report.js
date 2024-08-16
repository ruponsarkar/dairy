import React, { useState, useEffect } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import PaymentsIcon from "@mui/icons-material/Payments";
import { CSVLink, CSVDownload } from "react-csv";
import api from "../../API/api";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../../components/pannel/loader";

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

export default function Report() {
  const [data, setData] = useState();
  const [month, setMonth] = useState(getCurrentMonth());

  const [role, setRole] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [all, setAll] = useState();
  const [district, setDistrict] = useState();
  const [loading, setLoading] = useState(false);

  function getCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1

    return `${year}-${month}`;
  }

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("user")).role !== "Super Admin") {
      setDistrict(JSON.parse(sessionStorage.getItem("user")).district);
    }
  }, []);

  useEffect(() => {
    api
      .getRangeSubsidy("2020-01", "2029-01", district)
      .then((res) => {
        console.log("ress1 ", res);
        setAll(res.data.data);
      })
      .catch((err) => {
        console.log("err e", err);
      });
  }, [district]);

  const [selectAll, setSelectAll] = useState(false);
  const handeSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setData(data.map((item) => ({ ...item, selected: newSelectAll })));
  };

  const handleSelect = (id) => {
    const updatedItems = data.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setData(updatedItems);
    // Update the selectAll state based on the individual selections
    const allSelected = updatedItems.every((item) => item.selected);
    setSelectAll(allSelected);
  };

  const handleRangeSubsidy = () => {
    console.log("district ==>  ", district);
    setLoading(true);

    api
      .getRangeSubsidy(from, to, district)
      .then((res) => {
        console.log("ress ", res);
        setData(res.data.data);
        setAll(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err e", err);
      });
  };

  return (
    <Paper className="p-2">
        <Loader open={loading}/>
      <div className="my-3 d-flex gap-3"></div>

      <div className="d-flex justify-content-between">
        <div className="d-flex gap-2">
          <input
            type="month"
            className="form-control col-5"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            name=""
            id=""
          />
          <input
            type="month"
            className="form-control col-5"
            name=""
            value={to}
            onChange={(e) => setTo(e.target.value)}
            id=""
          />
          <div>
            <Button variant="contained" onClick={handleRangeSubsidy}>
              {" "}
              <SearchIcon />{" "}
            </Button>
          </div>
        </div>

        <div className="d-flex align-items-center gap-4">
          {all && (
            <div className="">
              <CSVLink data={all} filename={"AHVD_SUBSIDYcsv"}>
                {data ? "Download Report" : "Download Report(All)"}
              </CSVLink>
            </div>
          )}
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox
                  checked={selectAll ? true : false}
                  onClick={handeSelectAll}
                />
              </StyledTableCell>
              <StyledTableCell>Name of Applicant</StyledTableCell>
              <StyledTableCell>Name of DCS</StyledTableCell>
              <StyledTableCell>Registration No</StyledTableCell>
              <StyledTableCell>Subsidy Details</StyledTableCell>
              <StyledTableCell>Quantity of milk(in Litres)</StyledTableCell>
              <StyledTableCell>Ammount(in Rs)</StyledTableCell>
              {/* <StyledTableCell>Bank Account No</StyledTableCell> */}
              <StyledTableCell>Payment Status</StyledTableCell>
              {/* <StyledTableCell>Action</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <Checkbox
                      checked={row.selected ? true : false}
                      onClick={() => handleSelect(row.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>
                    {row.name_of_co_operatice_society}
                  </StyledTableCell>
                  {/* <StyledTableCell>{row.approverName}</StyledTableCell> */}
                  <StyledTableCell>{row.registration_no_of_co_operatice_society}</StyledTableCell>
                  <StyledTableCell width={200}>
                    {row.subsidy_details}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {" "}
                    <strong> {row.quantity} </strong>{" "}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    <strong> {row.total_amount} </strong>{" "}
                  </StyledTableCell>
                  {/* <StyledTableCell>{row.bank_account_no}</StyledTableCell> */}
                  <StyledTableCell>
                    <span
                      className={`${
                        row.paymentStatus === "Pending"
                          ? "bg-warning"
                          : "bg-success"
                      } rounded px-2`}
                    >
                      {row.paymentStatus}
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          {!data && (
            <div className="text-center">
              <h3>Data not found</h3>
            </div>
          )}
        </div>
      </TableContainer>
    </Paper>
  );
}
