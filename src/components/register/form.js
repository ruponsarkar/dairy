import React, {useState, useEffect} from 'react'
import { Paper } from '@mui/material'

import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {

    const navigation= useNavigate();

    const [formData, setFormData] = useState({

    })

    const handleInput = (e)=>{
        setFormData({
            ...formData, 
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = ()=>{
        console.log(formData);

        navigation('/Application')
    }


    return (
        <>
            <div className='container'>
                <div className='py-4'>
                    <h2>Providing Rs. 5 subsidy to farmers pouring milk to Dairy Co-operative Societies</h2>


                    <Paper elevation={4}>
                        <div className="row p-4">
                            <div className="col-md-6">
                                <label htmlFor="">Name of the applicant</label>
                                <input type="text" className='form-control' name="name" onChange={handleInput} id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Father/Spouse's Name</label>
                                <input type="text" className='form-control' name="fatherName" onChange={handleInput} id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Date of Birth</label>
                                <input type="text" className='form-control' name="dob" onChange={handleInput}  id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Gender of the applicant</label>
                                <input type="text" className='form-control' name="gender" onChange={handleInput}  id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">12 digit AADHAAR number</label>
                                <input type="text" className='form-control' name="aadhaarNo" onChange={handleInput}  id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">AADHAAR linked mobile number</label>
                                <input type="text" className='form-control' name="aadharMobile" onChange={handleInput}  id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">PAN number</label>
                                <input type="text" className='form-control' name="pan_nameber" onChange={handleInput}  id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Voter ID number</label>
                                <input type="text" className='form-control' name="voterID" onChange={handleInput}  id="" />
                            </div>
                            
                            
                            <div className="col-md-6">
                                <label htmlFor="">Area of residence</label>
                                <input type="text" className='form-control' name="area" onChange={handleInput}  id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">District</label>
                                <input type="text" className='form-control' name="district" onChange={handleInput}  id="" />
                            </div>
                            
                            <div className="col-md-6">
                                <label htmlFor="">LAC</label>
                                <input type="text" className='form-control' name="LAC" onChange={handleInput}  id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Village</label>
                                <input type="text" className='form-control' name="village" onChange={handleInput}  id="" />
                            </div>
                            
                            <div className="col-md-6">
                                <label htmlFor="">Gaon Panchayat</label>
                                <input type="text" className='form-control' name="gaon_panchayat" onChange={handleInput}  id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Block</label>
                                <input type="text" className='form-control' name="block" onChange={handleInput}  id="" />
                            </div>
                            
                            <div className="col-md-6">
                                <label htmlFor="">Pincode</label>
                                <input type="text" className='form-control' name="pincode" onChange={handleInput}  id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Police Station</label>
                                <input type="text" className='form-control' name="police_station" onChange={handleInput}  id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Name of Dairy Co-operative Society</label>
                                <input type="text" className='form-control' name="name_of_co_operatice_society" onChange={handleInput}  id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Address of the Dairy Co-operative Society</label>
                                <input type="text" className='form-control' name="addree_of_co_operatice_society" onChange={handleInput} id="" />
                            </div>
                            
                            <div className="col-md-6">
                                <label htmlFor="">Name of the bank</label>
                                <input type="text" className='form-control' name="bank_name" onChange={handleInput} id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Name of the Account holder (as mentioned in the passbook)</label>
                                <input type="text" className='form-control' name="bank_account_holder_name" onChange={handleInput} id="" />
                            </div>
                            
                            <div className="col-md-6">
                                <label htmlFor="">Bank Account Number</label>
                                <input type="text" className='form-control' name="bank_account_no" onChange={handleInput} id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">IFSC code</label>
                                <input type="text" className='form-control' name="ifsc_code" onChange={handleInput} id="" />
                            </div>
                            
                            <div className="col-md-6">
                                <label htmlFor="">Attach photo of passbook (first page)</label>
                                <input type="file" className='form-control' name="" id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Attach photo of PAN card</label>
                                <input type="file" className='form-control' name="" id="" />
                            </div>
                            
                            <div className="col-md-6">
                                <label htmlFor="">Attach photo of AADHAAR card</label>
                                <input type="file" className='form-control' name="" id="" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="">Milk Production Data per month (From April, 2024 to March 2024)</label>
                                <input type="text" className='form-control' name="milk_production_per_month" onChange={handleInput} id="" />
                            </div>

                            <div className="col-md-12">
                                <div className="text-center">
                                    <button className='btn btn-primary btn-sm' onClick={handleSubmit}>Confirm and Submit</button>
                                </div>
                            </div>



                        </div>
                    </Paper>


                </div>

            </div>
        </>
    )
}

export default RegisterForm