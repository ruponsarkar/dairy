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
import Checkbox from '@mui/material/Checkbox';
import Swal from "sweetalert2";
import PaymentsIcon from '@mui/icons-material/Payments';

import api from "../../API/api";

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

export default function PaymentPage() {
  const [data, setData] = useState();
  const [month, setMonth] = useState(getCurrentMonth());

  function getCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
  
    return `${year}-${month}`;
  }

  useEffect(() => {
    getMonthlyReport();
  }, [month]);

  const getMonthlyReport = () => {
    api
      .getMonthlyReport(month)
      .then((res) => {
        console.log("res", res);
        let selectAllData = res.data.data.map((e)=> ({ ...e, selected: true }) )
        setData(selectAllData);
      })
      .catch((err) => {
        console.log("err ", err);
      });
  };

  const handleChangeMonth = (e) => {
    setMonth(e.target.value)
  };



  const [selectAll, setSelectAll] = useState(false);
    const handeSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setData(data.map(item => ({ ...item, selected: newSelectAll })));

    }

    const handleSelect = (id) => {
        const updatedItems = data.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        );
        setData(updatedItems);
        // Update the selectAll state based on the individual selections
        const allSelected = updatedItems.every(item => item.selected);
        setSelectAll(allSelected);
    }






  const handleApproveAll = () => {
    let selectedData = data.filter((e) => e.selected);
    console.log(selectedData);
  };

  return (
    <Paper className="p-2">
      <div className="my-3 d-flex gap-3">
        <input
          type="month"
          name=""
          value={month}
          className="form-control col-2"
          id=""
          onChange={(e) => handleChangeMonth(e)}
        />
        <div>
          <Button variant="contained" onClick={handleApproveAll}>
             Payout for all &nbsp; <PaymentsIcon />
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell><Checkbox checked={selectAll ? true : false} onClick={handeSelectAll} /></StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Co-operative name</StyledTableCell>
              <StyledTableCell>Month</StyledTableCell>
              <StyledTableCell>Litter</StyledTableCell>
              <StyledTableCell>Ammount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              {/* <StyledTableCell>Action</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                  <Checkbox checked={row.selected ? true : false} onClick={() => handleSelect(row.id)} />
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>
                    {row.name_of_co_operatice_society}
                  </StyledTableCell>
                  <StyledTableCell>{row.month}</StyledTableCell>
                  <StyledTableCell>{row.litter}</StyledTableCell>

                  <StyledTableCell>{row.amount}</StyledTableCell>
                  <StyledTableCell>{row.paymentStatus}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
