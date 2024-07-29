import React, { useState } from "react";
import { Paper, Button } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Loader from "../common/loader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../API/api";

const districts = [
  'Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar', 'Charaideo', 'Chirang',
  'Darrang', 'Dhemaji', 'Dhubri', 'Dibrugarh', 'Goalpara', 'Golaghat', 'Hailakandi',
  'Hojai', 'Jorhat', 'Kamrup Metropolitan', 'Kamrup', 'Karbi Anglong', 'Karimganj',
  'Kokrajhar', 'Lakhimpur', 'Majuli', 'Morigaon', 'Nagaon', 'Nalbari', 'Dima Hasao',
  'Sivasagar', 'Sonitpur', 'South Salmara-Mankachar', 'Tinsukia', 'Udalguri', 'West Karbi Anglong'
];

const RegisterForm = ({ mobileNumber, showFileInput, setShowFileInput }) => {
  const navigation = useNavigate();

  const [openLoader, setOpenLoder] = useState(false);
  // const [showFileInput, setShowFileInput] = useState(false);
  const [formData, setFormData] = useState({
    mobileNumber: mobileNumber,
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
    formData.status = 'Incompleted'
    api.saveForm(formData).then((res) => {
      // axios.post(api, formData).then((res)=>{
      console.log("res=>", res);
      Swal.fire('Saved Data')
      setShowFileInput(true);
    })
      .catch((err) => {
        console.log("err :", err);
        Swal.fire('Something went wrong ')
      })

  };

  const handleSubmit = () => {
    if (isUploaded.passbook === false || isUploaded.aadhaarCard === false || isUploaded.panCard === false) {
      console.log("All file required");
      Swal.fire('All files required !');
      return;
    }

    console.log(formData);
    const data = {
      mobileNumber: mobileNumber,
      status: 'Draft'
    }
    api.updateFormStatus(data).then((res) => {
      console.log("final response :", res);
      navigation("/Certificate", { state: { data: formData } });
    })
      .catch((err) => {
        console.log("err : ", err);
        Swal.fire('Something went wrong !');
      })


  };



  const handleFileUpload = (type) => {
    setOpenLoder(true)
    if (type === 'passbook') {
      upload(type, passbook, 'passbook');
    }
    if (type === 'panCard') {
      upload(type, panCard, 'pancard');
    }
    if (type === 'aadhaarCard') {
      upload(type, aadhaarCard, 'aadharcard');
    }
  }

  const upload = (type, file, fileName) => {
    console.log("Type=", type, "File=", file);
    console.log("formData.mobileNumber ==>>", formData.mobileNumber);
    const Data = new FormData();
    Data.append('mobileNumber', formData.mobileNumber);
    Data.append('fileType', type);
    Data.append('fileName', fileName + '.' + file.name.split('.')[1]);
    Data.append('fileSize', file.size);
    Data.append('file', file);
    console.log("Data=", Data);
    api.uploadDocument(Data)
      .then((res) => {
        console.log("Response==>", res);
        switch (type) {
          case 'passbook':
            setIsuploaded({ ...isUploaded, passbook: true })
            break;
          case 'panCard':
            setIsuploaded({ ...isUploaded, panCard: true })
            break;
          case 'aadhaarCard':
            setIsuploaded({ ...isUploaded, aadhaarCard: true })
            break;
        }
        setOpenLoder(false);
      })
      .catch((err) => {
        setOpenLoder(false);
        console.log("error==>", err);
      })
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
            <select className="form-control"
              name="gender"
              onChange={handleInput}
              id="">
              <option value="male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {/* <input
              type="text"
              className="form-control"
              name="gender"
              onChange={handleInput}
              id=""
            /> */}
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
              name="pan_number"
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

            <select className="form-control"
              name="district"
              onChange={handleInput} id="">
              {districts && districts.map((d) => (
                <option value={d}>{d}</option>
              ))}
            </select>

            {/* <input
              type="text"
              className="form-control"
              name="district"
              onChange={handleInput}
              id=""
            /> */}
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
            <input type="file" className="form-control" onChange={(e) => setPassbook(e.target.files[0])} />
          </div>
          <div className="col-md-6 d-flex align-items-center gap-4">
            <Button variant="contained" onClick={() => handleFileUpload('passbook')}>Upload</Button> {isUploaded.passbook && <DoneAllIcon color="success" />}
          </div>


          <div className="col-md-6">
            <label htmlFor="">Attach photo of PAN card</label>
            <input type="file" className="form-control" onChange={(e) => setPanCard(e.target.files[0])} />
          </div>
          <div className="col-md-6 d-flex align-items-center gap-4">
            <Button variant="contained" onClick={() => handleFileUpload('panCard')}>Upload</Button>  {isUploaded.panCard && <DoneAllIcon color="success" />}
          </div>

          <div className="col-md-6">
            <label htmlFor="">Attach photo of AADHAAR card</label>
            <input type="file" className="form-control" onChange={(e) => setAadhaarCard(e.target.files[0])} />
          </div>
          <div className="col-md-6 d-flex align-items-center gap-4">
            <Button variant="contained" onClick={() => handleFileUpload('aadhaarCard')}>Upload</Button>  {isUploaded.aadhaarCard && <DoneAllIcon color="success" />}
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

  const closeLoader = () => {
    setOpenLoder(false)
  }

  return (
    <>
      <Loader open={openLoader} handleClose={closeLoader} />
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
