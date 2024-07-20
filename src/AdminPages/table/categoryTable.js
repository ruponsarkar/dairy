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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function CatTable(props) {

    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState();
    const [id, setId] = useState();

    const handleClickOpen = (id) => {
        setOpen(true);
        getCategoryWithId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = (e) => {
        console.log(e.target.value);
        setFormData(e.target.value);
    }

    const getCategoryWithId = (id) => {
        api.getCategoryWithId(id)
            .then((res) => {
                setId(id);
                console.log(res);
                setFormData(res.data.category.cat_name)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const handleSubmit = () => {

        if (formData === "") {
            setOpen(false);
            Swal.fire({
                title: "Error",
                text: "Category name can't be empty !",
                icon: 'error',
            })
                .then(() => {
                    setOpen(true);
                })
            return;
        }

        console.log(formData);
        api.postCategory(formData, id)
            .then((res) => {
                // getCategory();
                console.log(res);
                if (res.data.status === 200) {
                    setOpen(false);
                    Swal.fire({
                        title: "Success",
                        text: res.data.message,
                        icon: 'success',
                    })

                }
                else {
                    Swal.fire({
                        title: "error",
                        text: "Something went wrong !",
                        icon: 'error',
                    })
                }


            })
            .catch((err) => {
                console.log(err.response);
                Swal.fire({
                    title: "error",
                    text: "Something went wrong !",
                    icon: 'error',
                })
            })
    }



    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>SL No</StyledTableCell>
                            <StyledTableCell align="center">Cat Name</StyledTableCell>
                            <StyledTableCell align="right">Edit</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.category.map((row, index) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.cat_name}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <div>
                                        <button className='btn btn-warning' onClick={() => handleClickOpen(row.id)}>Edit </button>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            {/* for update  */}
            <Dialog open={open} onClose={handleClose}>
                {/* <DialogTitle>Category</DialogTitle> */}
                <DialogContent>
                    <DialogContentText>
                        Update Category
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Category"
                        type="text"
                        fullWidth
                        value={formData}
                        variant="standard"
                        onChange={handleInput}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Update</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}