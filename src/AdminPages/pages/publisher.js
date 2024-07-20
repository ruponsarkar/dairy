import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import PublisherTable from '../table/publisherTable';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2';

import axios from 'axios';
import api from '../../API/api';

const AdminPublisher = () => {

    const [open, setOpen] = React.useState(false);
    const [publisher, setPublisher] = useState([]);

    const [formData, setFormData] = useState();
    const [logo, setLogo] = useState();

    useEffect(() => {
        getPublisher();
    }, []);

    const getPublisher = () => {
        api.getPublisher()
            .then((res) => {
                console.log(res);
                setPublisher(res.data.publisher)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const handleClickOpen = () => {
        setOpen(true);
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


        axios.post(api, allData)
            .then((res) => {
                getPublisher();
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
            <div className="container">
                <Card>
                    <div className="row">
                        <div className="col-6">
                            <div className='m-2'>
                                {/* <button onClick={handleClickOpen}>+ Add New Category</button> */}
                                <Button variant="contained" color='warning' onClick={handleClickOpen}>
                                    + Add New Publisher
                                </Button>


                                <Dialog open={open} onClose={handleClose}>
                                    {/* <DialogTitle>Category</DialogTitle> */}
                                    <DialogContent>
                                        <DialogContentText>
                                            Add New Publisher
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Publisher Name"
                                            type="text"
                                            fullWidth
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
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handleSubmit}>+ Add</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className='mt-2'>

                    <Card>
                        <div className="row">
                            <div className="col-12">
                                <div className='m-2 text-center'>
                                    <h4> Publishers</h4>
                                </div>


                                <PublisherTable publisher={publisher} />


                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </>
    )
}

export default AdminPublisher;