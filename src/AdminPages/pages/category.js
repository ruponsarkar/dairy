import React, {useEffect, useState} from 'react';
import { Card } from '@mui/material';
import CatTable from '../table/categoryTable';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2';

import api from '../../API/api';

const AdminCategory = () => {

    const [open, setOpen] = React.useState(false);
    const [cat, setCat] = useState([]);

    const [formData, setFormData] = useState();

    useEffect(()=>{
        getCategory();
    }, []);

    const getCategory=()=>{
        api.getCategory()
        .then((res)=>{
            console.log(res);
            setCat(res.data.category)
        })
        .catch((err)=>{
            console.log(err.response);
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInput=(e)=>{
        console.log(e.target.value);
        setFormData(e.target.value);
    }

    const handleSubmit=()=>{

        if(formData === ""){
            setOpen(false);
            Swal.fire({
                title: "Error",
                text: "Category name can't be empty !",
                icon: 'error',
            })
            .then(()=>{
                setOpen(true);
            })
            return;
        }

        console.log(formData);
        api.postCategory(formData)
        .then((res)=>{
            getCategory();
            console.log(res);
            if(res.data.status === 200){
                setOpen(false);
                Swal.fire({
                    title: "Success",
                    text: res.data.message,
                    icon: 'success',
                })

            }
            else{
                Swal.fire({
                    title: "error",
                    text: "Something went wrong !",
                    icon: 'error',
                })
            }


        })
        .catch((err)=>{
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
                                    + Add New Category
                                </Button>


                                <Dialog open={open} onClose={handleClose}>
                                    {/* <DialogTitle>Category</DialogTitle> */}
                                    <DialogContent>
                                        <DialogContentText>
                                            Add New Category
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Enter Category Name"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={handleInput}
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
                                    <h4> Category</h4>
                                </div>


                                <CatTable category={cat}/>




                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </>
    )
}

export default AdminCategory;