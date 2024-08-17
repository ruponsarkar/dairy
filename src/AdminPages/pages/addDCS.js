import React, { useEffect, useState } from 'react';
import { Card, Paper } from '@mui/material';
import AdminTable from '../table/adminTable';

import Button from '@mui/material/Button';
import Modal from '../../ui-component/modal';
import Swal from 'sweetalert2';
import Loader from '../../components/pannel/loader';
import api from '../../API/api';
import DCSTable from '../table/DCSTable';

const districts = [
    'Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang',
    'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Goalpara', 'Golaghat', 'Hailakandi',
    'Hojai', 'Jorhat', 'Kamrup Metropolitan', 'Kamrup', 'Karbi Anglong', 'Karimganj',
    'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Dima Hasao',
    'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'
  ];

const AddDCS = () => {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        'status': 1
    });

    useEffect(()=>{
        getAllDCS();
    },[])


    const handleCreateDCS=()=>{

        api.createDCS(formData).then((res)=>{
            console.log("res ", res);
            setOpen(false)
            Swal.fire('DCS added successfully');
            getAllDCS();
        })
        .catch((err)=>{
            console.log("err ", err);
            setOpen(false)
            Swal.fire('Something went wrong');
        })
    }


    const getAllDCS=()=>{
        setLoading(true)
        api.getAllDCS().then((res)=>{
            console.log("res", res.data);
            setData(res.data.data)
            setLoading(false)
        })
        .catch((err)=>{
            console.log("err :", err);
            setLoading(false)
        })
    }


    const addAdminForm = () => {
        return (
            <>
            <Paper elevation={1}>
            
                <div className='p-3'>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor=""> Name of DCS</label>
                            <input type="text" className='form-control' name="name" id="" onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">Registration no</label>
                            <input type="text" className='form-control' name="registration_no" id="" onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="">District</label>

                            <select className="form-control"
                                name="district"
                                onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})} id="">
                                <option value="">-select-</option>
                                {districts && districts.map((d) => (
                                    <option value={d}>{d}</option>
                                ))}
                            </select>

                        </div>
                        <div className="col-md-12">
                            <label htmlFor=""> Address of DCS</label>
                            <input type="text" className='form-control' name="address" id="" onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})} />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="">Password</label>
                            <input type="password" className='form-control' name="password" id="" onChange={(e)=>setFormData({...formData, [e.target.name]: e.target.value})} />
                        </div>



                        <div className='text-center'>
                            <Button variant='contained' onClick={handleCreateDCS}>Add DCS</Button>
                        </div>
                    </div>
                </div>

                </Paper>
            </>
        )
    }



    return (
        <>
        <Loader open={loading}/>
            <div className="container">
                <Card>
                    <div className="row">
                        <div className="col-6">
                            <div className='m-2'>
                                <Button 
                                variant="contained"
                                color="primary"
                                sx={{
                                  height: 40,
                                  minWidth: 120,
                                  '@media (max-width: 600px)': {
                                    width: '100%',
                                    marginTop: 1,
                                  },
                                }}
                                 onClick={() => setOpen(true)}>
                                    + Add New DCS
                                </Button>

                                <Modal maxWidth='md' open={open} handleClose={() => setOpen(false)} modaldata={addAdminForm()} />

                            </div>
                        </div>
                    </div>
                </Card>
                <div className='mt-2'>

                    <Card>
                        <div className="row">
                            <div className="col-12">
                                <div className='m-2 text-center'>
                                    <h4> DCS</h4>
                                </div>


                                <DCSTable data={data} />




                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </>
    )
}

export default AddDCS;