import React, { useState, useEffect } from "react";
import { Paper, Button } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = ({ setIsVerified, setMobileNumber }) => {
  const navigation = useNavigate();
  const [otp, setOtp] = useState();

  const [formdata, setFormData] = useState({
    otp: "",
    number: "",
  });

  const handleSendOTP = () => {
    if (!formdata.number) {
      Swal.fire("Enter mobile number");
      return;
    }
    console.log("otp");
    setOtp("1234");
  };

  const handleVerifyOtp = () => {
    console.log(formdata);
    console.log("check number");


    if (otp === formdata.otp) {
      console.log("verified");
      setMobileNumber(formdata.number);


      let data = {
        mobileNumber: formdata.number,
      };
      let api = "http://127.0.0.1:8400/getFormByMobileNumber";
      axios
        .post(api, data)
        .then((res) => {
          console.log("res=>", res.data.data);
          if (res.data.data) {
            console.log("found");
            navigation("/Certificate", {state: { data: res.data.data }});

          } else {
            console.log("not found");
            setIsVerified(true);
          }
        })
        .catch((err) => {
          console.log("err :", err);
        });


      // navigation("/Certificate");
      // setIsVerified(true);
    } else {
      console.log("not match");
      Swal.fire("Wrong OTP");
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
                  <Button variant="contained" onClick={handleSendOTP}>
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
