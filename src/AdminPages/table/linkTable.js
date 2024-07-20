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


export default function LinkTable(props) {

    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState();
    const [id, setId] = useState();

    const handleClickOpen = (id, active) => {
        setOpen(true);

        handleDisable(id, active)
    };



    const handleDisable = (id, active) => {

        if(active){
            var text = "Are you sure want to delete it?"
        }
        else{
            var text = "Are you sure want to enable it?"
        }

        Swal.fire({
            title: text,
            
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('working');

                api.linkDisable(id, active)
                    .then((res) => {
                        console.log(res);
                        props.getLink()
                        Swal.fire({
                            title: "Success",
                            text: "Updated Successfully !",
                            icon: 'success',
                        })
                    })
                    .catch((err) => {
                        console.log(err.response);
                    })

            } else {
                console.log("nothing");
                return


            }
        })







    }




    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>SL No</StyledTableCell>
                            <StyledTableCell>Link</StyledTableCell>
                            <StyledTableCell align="center">Vide0</StyledTableCell>
                            <StyledTableCell align="right">Active</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.links && props.links.filter((f)=> f.isActive == 1).map((row, index) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.links}
                                </StyledTableCell>
                                <StyledTableCell align="center">

                                    

                                    <iframe width="130" height="100" src={row.links} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                    
                                    </StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.isActive == 1 ?
                                        <div>
                                            <button className='bg-success text-white' onClick={() => handleClickOpen(row.id, row.isActive)}> Delete </button>
                                            {/* <button className='btn btn-success btn-sm' onClick={() => handleClickOpen(row.id, row.isActive)}> Delete </button> */}
                                        </div>
                                        :
                                        <div>
                                            <button className='btn btn-danger btn-sm' onClick={() => handleClickOpen(row.id, row.isActive)}> Enable </button>
                                        </div>

                                    }
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </>
    );
}