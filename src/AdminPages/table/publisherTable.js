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
import Checkbox from '@mui/material/Checkbox';

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

export default function PublisherTable(props) {

    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState();
    const [logo, setLogo] = useState();
    const [id, setId] = useState();

    const handleClickOpen = (id) => {
        setOpen(true);
        getPublisherWithId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = (e) => {
        console.log(e.target.value);
        setFormData(e.target.value);
    }

    const handleLogo = (e) => {
        setLogo(e.target.files[0]);
    }

    const getPublisherWithId = (id) => {
        api.getPublisherWithId(id)
            .then((res) => {
                setId(id);
                console.log(res);
                setFormData(res.data.publisher.publishers_name)
                setChecked(res.data.publisher.type)
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

        const api = process.env.REACT_APP_MAIN_API + "postPublisher";
        const allData = new FormData();
        allData.append('publisher', formData)
        allData.append('logo', logo)
        allData.append('id', id)
        allData.append('checked', checked)


        axios.post(api, allData)
            .then((res) => {
                // getPublisher();
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

    const [checked, setChecked] = React.useState();
    const handleCheck = (event) => {
        console.log(event.target.checked);
        setChecked(event.target.checked);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>SL No</StyledTableCell>
                            <StyledTableCell align="center">Publisher</StyledTableCell>
                            <StyledTableCell align="center">Logo</StyledTableCell>
                            <StyledTableCell align="center">View On Front</StyledTableCell>
                            <StyledTableCell align="right">Edit</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.publisher.map((row, index) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.publishers_name}</StyledTableCell>
                                <StyledTableCell align="center"> <img src={`${process.env.REACT_APP_BACKEND}assets/publisherLogo/${row.logo}`} alt='Publisher Logo' height={50} /> </StyledTableCell>

                                <StyledTableCell align="center">
                                    {row.type}
                                    </StyledTableCell>

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
                        Update Publisher
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Publisher Name"
                        type="text"
                        fullWidth
                        value={formData}
                        variant="standard"
                        onChange={handleInput}
                    />



                    <TextField
                        margin="dense"
                        id="name"
                        label="Publisher Logo"
                        type="file"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                        onChange={handleLogo}
                    />

                    <div className='my-4'>
                        Make Main Publisher: <Checkbox
                            checked={checked === 'true'? true: false}
                            onChange={handleCheck}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>




                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}