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

import Swal from "sweetalert2";

import api from "../../API/api";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

export default function AdminTable({ data, getAdmins }) {







    const handleStatus=(data)=>{
        console.log("data==>>", data);
        // handleClose();
        Swal.fire({
            title: "Are you sure want to change active status?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change it!"
          }).then((result) => {
            if (result.isConfirmed) {
                if(data.status === 'Active'){
                    data.status = 'Inactive';
                }
                else{
                    data.status = 'Active';
                }
                api.addOrUpdateAdmin(data).then((res)=>{
                    console.log("res", res);
                    // setOpen(false)
                    getAdmins();
                    
                    Swal.fire('Updated added successfully');
                    // getAdmins();
                })
                .catch((err)=>{
                    console.log("err", err);
                    Swal.fire('Something went wrong');
                })
            }
          });
    }


  const menuItems = (data) => [
    {
      name: "Change Active Status",
      data: data,
      onclick: ()=>handleStatus(data)
    },
    {
      name: "Delete",
      data: data,
    //   onclick: ''
    },
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SL No</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>District</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Password</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.mobileNumber}</StyledTableCell>
                  <StyledTableCell>{row.district}</StyledTableCell>
                  <StyledTableCell>{row.role}</StyledTableCell>

                  <StyledTableCell>------</StyledTableCell>
                  <StyledTableCell>
                    {row.status === 'Active' && <div className="bg-success text-center text-white">Active</div> }
                    {row.status === 'Inactive' && <div className="bg-danger text-center text-white">Inactive</div> }
                    </StyledTableCell>
                  <StyledTableCell>
                    <BasicMenu menuItems={menuItems(row)} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
