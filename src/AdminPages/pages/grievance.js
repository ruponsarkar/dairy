// ProfessionalTable.js

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    Paper,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    MenuItem,
    InputLabel,
    Select,
    FormControl,
    Link,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import Application from "../../components/register/application";
import api from "../../API/api";
import Swal from "sweetalert2";
import CancelIcon from "@mui/icons-material/Cancel";
import Checkbox from '@mui/material/Checkbox';
import { CSVLink, CSVDownload } from "react-csv";
import PaymentsIcon from "@mui/icons-material/Payments";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.blue,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));




const Grievance = () => {

    const [data, setData] = useState();

    useEffect(()=>{
        getGrievance();
    },[])

    const getGrievance=()=>{
        api.getGrievance().then((res)=>{
            console.log("res", res.data.data);
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log("err", err);
        })
    }

   

    return (
        <Paper className="p-2">
            <Toolbar>
                <Typography variant="h6" id="tableTitle" component="div">
                    Grievance
                </Typography>
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>



            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size="medium"
                >


                    <TableHead>
                        <TableRow>
                            <StyledTableCell>#</StyledTableCell>
                            <StyledTableCell>Applicant ID</StyledTableCell>
                            <StyledTableCell>Applicant Name</StyledTableCell>
                            <StyledTableCell>Type</StyledTableCell>
                            <StyledTableCell>Details</StyledTableCell>
                            {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data &&
                            data.map((row, index) => {
                                return (
                                    <TableRow hover tabIndex={-1} key={row.name}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.userId}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.userName}
                                        </TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell>{row.details}</TableCell>
                                     
                                       
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>

                <div>
                    {!data &&
                        <div className="text-center">
                            <h3>Data not found</h3>
                        </div>
                    }
                </div>


            </TableContainer>

        </Paper>
    );
};

export default Grievance;
