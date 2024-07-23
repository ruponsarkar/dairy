import React, { useState, useEffect } from "react";
import { Paper, Button } from "@mui/material";
import Swal from "sweetalert2";




const Verify = ({ setIsVerified }) => {
  const [otp, setOtp] = useState();

  const [formdata, setFormData] = useState({
    otp: "",
    number: "",
  });

  const handleSendOTP = () => {
    if (!formdata.number) {
      Swal.fire('Enter mobile number')
      return;
    }
    console.log("otp");
    setOtp('1234');
  };

  const handleVerifyOtp = () => {
    console.log(formdata);




    if (otp === formdata.otp) {
      console.log("verified");
      setIsVerified(true)
    }
    else {
      console.log("not match");
      Swal.fire('Wrong OTP')
    }
  };

  return (
    <>
      <div className="container">
        <div className="py-4">
          <h2>
            Providing Rs. 5 subsidy to farmers pouring milk to Dairy
            Co-operative Societies
          </h2>

          <Paper elevation={4}>
            <div className="row p-4">
              <div className="col-md-4">
                <label htmlFor="">Enter Your Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  name=""
                  id=""
                  onChange={(e) =>
                    setFormData({ ...formdata, number: e.target.value })
                  }
                />
              </div>
              {!otp ? (
                <div className="col-md-6 d-flex align-items-center">
                  <Button
                    variant="contained"
                    onClick={handleSendOTP}
                  >
                    Send OTP
                  </Button>
                </div>
              ) : (
                <>
                  <div className="col-md-1">
                    <label htmlFor="">OTP</label>
                    <input
                      type="password"
                      className="form-control"
                      name=""
                      id=""
                      onChange={(e) =>
                        setFormData({ ...formdata, otp: e.target.value })
                      }
                    />
                  </div>

                  <div className="col-md-4 d-flex align-items-center">
                   
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleVerifyOtp}
                        >
                        Verify Your Number
                      </Button>
                  </div>
                </>
              )}
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Verify;
