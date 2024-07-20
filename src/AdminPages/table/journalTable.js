import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import api from '../../API/api';
import EditNoteIcon from '@mui/icons-material/EditNote';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import LinearProgress from '@mui/material/LinearProgress';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import AddJournal from '../pages/addJournal';

import AddTaskIcon from '@mui/icons-material/AddTask';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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




export default function JournalTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [journals, setJournals] = useState([]);
    const [load, setLoad] = useState(false);

    const [open, setOpen] = React.useState(false);

    const [id, setId] = useState();

    const handleClickOpen = (id) => {
        setOpen(true);
        setId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getJournal();

    }, []);

    const getJournal = () => {
        setLoad(true)
        api.getJournal()
            .then((res) => {
                setLoad(false);
                console.log(res);
                setJournals(res.data.journals);
            })
            .catch((err) => {
                setLoad(false);
                console.log(err.response);
            })

    }


    const exclusive = (isExclusive, id) => {
        console.log(isExclusive);

        if (isExclusive) {
            Swal.fire({
                title: "Are you sure want to de-active it as Exclusive",
                // text: "It will no longer visible on Public ",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Deactive'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('working');
                    handleExclusive(isExclusive, id)
                } else {
                    console.log("nothing");


                }
            })
        }
        else {
            Swal.fire({
                title: "Are you sure want to active it as Exclusive",
                // text: "It will visible on Public ",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Active'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('working');
                    handleExclusive(isExclusive, id)

                } else {
                    console.log("nothing");


                }
            })
        }

    }

    const handleExclusive = (data, id) => {
        api.handleExclusive(data, id)
            .then((res) => {
                console.log(res);
                getJournal();
                if (res.data.status == 200) {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: res.data.message
                    })
                }



            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const deleteJournal=(id)=>{

        Swal.fire({
            title: "Are you sure want to delete ?",
            // text: "It will no longer visible on Public ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('working');
                
                api.deleteJournal(id).then((res)=>{
                    console.log(res);
                    getJournal();
                    
                    Swal.fire({
                        title: 'Deleted',
                        icon: 'success',
                        text: "Journal Deleted Successfully"
                    })


                })
                .catch((err)=>{
                    console.log(err.response);
                })




            } else {
                console.log("nothing");


            }
        })

    }


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {load &&
                <LinearProgress />
            }

            <Dialog
                maxWidth='lg'
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Edit </DialogTitle>
                <DialogContent>

                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        <AddJournal id={id} handleClose={handleClose} />

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>SL no</StyledTableCell>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align="center">Category</StyledTableCell>
                            <StyledTableCell align="center">Publisher</StyledTableCell>
                            <StyledTableCell align="center">Exclusive</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {journals.map((row, index) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.sl}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.title}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.cat_name}</StyledTableCell>
                                <StyledTableCell align="center">{row.publishers_name}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <div>
                                        {row.isExclusive ?
                                            <button onClick={() => exclusive(row.isExclusive, row.j_id)} className='btn btn-success btn-sm' title='Exclusive is Active'><AddTaskIcon />
                                            </button>
                                            :
                                            <button onClick={() => exclusive(row.isExclusive, row.j_id)} className='btn btn-danger btn-sm' title='Click to add on Exclusive'>  <AddCircleOutlineIcon />
                                            </button>

                                        }
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {/* <div>
                                        <button className='btn btn-warning btn-sm' onClick={() => handleClickOpen(row.j_id)}>Edit </button>
                                    </div> */}

                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <IconButton aria-label="delete" size="large" onClick={() => handleClickOpen(row.j_id)}>
                                            <EditNoteIcon color='primary' fontSize="inherit" titleAccess='Edit' />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="large" onClick={()=> deleteJournal(row.j_id)}>
                                            <DeleteForeverIcon color='error' fontSize="inherit" titleAccess='Delete' />
                                        </IconButton>
                                    </Stack>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={journals.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}

        </Paper>



    );
}