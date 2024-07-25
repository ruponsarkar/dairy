import React, {useEffect, useState} from 'react';
import { Card } from '@mui/material';
import AdminTable from '../table/adminTable';

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
    const [cat, setCat] = useState([
        {name: 'Rupon'}
    ]);

    const [formData, setFormData] = useState();



    return (
        <>
            <div className="container">
                <Card>
                    <div className="row">
                        <div className="col-6">
                            <div className='m-2'>
                                <Button variant="contained" color='warning' >
                                    + Add New Admin
                                </Button>


                                {/* <Dialog open={open} onClose={handleClose}>
                                    <DialogContent>
                                        <DialogContentText>
                                            Add New Admin
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
                                </Dialog> */}

                            </div>
                        </div>
                    </div>
                </Card>
                <div className='mt-2'>

                    <Card>
                        <div className="row">
                            <div className="col-12">
                                <div className='m-2 text-center'>
                                    <h4> Admins</h4>
                                </div>


                                <AdminTable category={cat}/>




                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </>
    )
}

export default AdminCategory;