import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Swal from 'sweetalert2';

import axios from 'axios';
import api from '../../API/api';



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
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function ContactTable() {

    const [contacts, setContact] = useState([]);


    useEffect(() => {
        getContactData();

    }, []);

    const getContactData = () => {
        api.getContactData()
            .then((res) => {
                console.log(res);
                setContact(res.data.contact);
            })
            .catch((err) => {
                console.log(err.response);

            })
    }



    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>SL No</StyledTableCell>
                            <StyledTableCell align="">Name</StyledTableCell>
                            <StyledTableCell align="">Contact</StyledTableCell>
                            <StyledTableCell align="">Email</StyledTableCell>
                            <StyledTableCell align="">Message</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((row, index) => (
                            <StyledTableRow >
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.contact}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.email}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.message}
                                </StyledTableCell>
                                {/* <StyledTableCell align="center">{row.name}</StyledTableCell> */}

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>



        </>
    );
}