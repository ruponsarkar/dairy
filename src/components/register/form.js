import React, { useState, useEffect } from "react";
import { Paper, Button } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Loader from "../common/loader";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from "sweetalert2";

const RegisterForm = ({mobileNumber}) => {
  const navigation = useNavigate();

  const [openLoader, setOpenLoder] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);
  const [formData, setFormData] = useState({
    mobileNumber: mobileNumber
  });
  const [passbook, setPassbook] = useState();
  const [panCard, setPanCard] = useState();
  const [aadhaarCard, setAadhaarCard] = useState();

  const [isUploaded, setIsuploaded] = useState({
    passbook: false,
    panCard: false,
    aadhaarCard: false
  })

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowFileInput = () => {
    console.log(formData);

    let api = 'http://127.0.0.1:8400/saveForm'
    axios.post(api, formData).then((res)=>{
        console.log("res=>", res);
        Swal.fire('Saved Data')
        setShowFileInput(true);
    })
    .catch((err)=>{
        console.log("err :", err);
        Swal.fire('Something went wrong ')
    })

  };

  const handleSubmit = () => {
    console.log(formData);
  

    navigation("/Certificate", {state: {data: formData}});
  };



  const handleFileUpload=(type)=>{
    setOpenLoder(true)
    if(type === 'passbook'){
        console.log("type: ", type, " file : ", passbook);
        setIsuploaded({...isUploaded, passbook: true})
        
    }
    if(type === 'panCard'){
        console.log("type: ", type, " file : ", panCard);
        setIsuploaded({...isUploaded, panCard: true})
    }
    if(type === 'aadhaarCard'){
        console.log("type: ", type, " file : ", aadhaarCard);
        setIsuploaded({...isUploaded, aadhaarCard: true})

    }
  }

  const inputForm = () => {
    return (
      <>
        <div className="row p-4">
          <div className="col-md-6">
            <label htmlFor="">Name of the applicant</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">Father/Spouse's Name</label>
            <input
              type="text"
              className="form-control"
              name="fatherName"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">Date of Birth</label>
            <input
              type="text"
              className="form-control"
              name="dob"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">Gender of the applicant</label>
            <input
              type="text"
              className="form-control"
              name="gender"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">12 digit AADHAAR number</label>
            <input
              type="text"
              className="form-control"
              name="aadhaarNo"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">AADHAAR linked mobile number</label>
            <input
              type="text"
              className="form-control"
              name="aadharMobile"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">PAN number</label>
            <input
              type="text"
              className="form-control"
              name="pan_nameber"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">Voter ID number</label>
            <input
              type="text"
              className="form-control"
              name="voterID"
              onChange={handleInput}
              id=""
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="">Area of residence</label>
            <input
              type="text"
              className="form-control"
              name="area"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">District</label>
            <input
              type="text"
              className="form-control"
              name="district"
              onChange={handleInput}
              id=""
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="">LAC</label>
            <input
              type="text"
              className="form-control"
              name="LAC"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">Village</label>
            <input
              type="text"
              className="form-control"
              name="village"
              onChange={handleInput}
              id=""
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="">Gaon Panchayat</label>
            <input
              type="text"
              className="form-control"
              name="gaon_panchayat"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">Block</label>
            <input
              type="text"
              className="form-control"
              name="block"
              onChange={handleInput}
              id=""
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="">Pincode</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">Police Station</label>
            <input
              type="text"
              className="form-control"
              name="police_station"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">Name of Dairy Co-operative Society</label>
            <input
              type="text"
              className="form-control"
              name="name_of_co_operatice_society"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">Address of the Dairy Co-operative Society</label>
            <input
              type="text"
              className="form-control"
              name="addree_of_co_operatice_society"
              onChange={handleInput}
              id=""
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="">Name of the bank</label>
            <input
              type="text"
              className="form-control"
              name="bank_name"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">
              Name of the Account holder (as mentioned in the passbook)
            </label>
            <input
              type="text"
              className="form-control"
              name="bank_account_holder_name"
              onChange={handleInput}
              id=""
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="">Bank Account Number</label>
            <input
              type="text"
              className="form-control"
              name="bank_account_no"
              onChange={handleInput}
              id=""
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="">IFSC code</label>
            <input
              type="text"
              className="form-control"
              name="ifsc_code"
              onChange={handleInput}
              id=""
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="">
              Milk Production Data per month (From April, 2024 to March 2024)
            </label>
            <input
              type="text"
              className="form-control"
              name="milk_production_per_month"
              onChange={handleInput}
              id=""
            />
          </div>

          <div className="col-md-12">
            <div className="text-center">
              <button
                className="btn btn-primary btn-sm"
                onClick={handleShowFileInput}
              >
                Confirm and Next
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const fileForm = () => {
    return (
      <>
        <div className="row p-4">
          <div className="col-md-6">
            <label htmlFor="">Attach photo of passbook (first page)</label>
            <input type="file" className="form-control" name="" onChange={(e)=>setPassbook(e.target.files[0])} id="" />
          </div>
          <div className="col-md-6 d-flex align-items-center gap-4">
            <Button variant="contained" onClick={()=>handleFileUpload('passbook')}>Upload</Button> {isUploaded.passbook &&  <DoneAllIcon color="success"/> }
          </div>


          <div className="col-md-6">
            <label htmlFor="">Attach photo of PAN card</label>
            <input type="file" className="form-control" name="" onChange={(e)=>setPanCard(e.target.files[0])} id="" />
          </div>
          <div className="col-md-6 d-flex align-items-center gap-4">
          <Button variant="contained" onClick={()=>handleFileUpload('panCard')}>Upload</Button>  {isUploaded.panCard &&  <DoneAllIcon color="success"/> }
          </div>

          <div className="col-md-6">
            <label htmlFor="">Attach photo of AADHAAR card</label>
            <input type="file" className="form-control" name="" onChange={(e)=>setAadhaarCard(e.target.files[0])}  id="" />
          </div>
          <div className="col-md-6 d-flex align-items-center gap-4">
          <Button variant="contained" onClick={()=>handleFileUpload('aadhaarCard')}>Upload</Button>  {isUploaded.aadhaarCard &&  <DoneAllIcon color="success"/> }
          </div>

          <div className="col-md-12">
            <div className="text-center">
              <Button variant="contained" color="success" onClick={handleSubmit}>
                Confirm and Submit
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const closeLoader=()=>{
    setOpenLoder(false)
  }

  return (
    <>
    <Loader open={openLoader} handleClose={closeLoader}/>
      <div className="container">
        <div className="py-4">
          <h2>
            Providing Rs. 5 subsidy to farmers pouring milk to Dairy
            Co-operative Societies
          </h2>

          <Paper elevation={4}>
            {!showFileInput ? inputForm() : fileForm()}
          </Paper>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
