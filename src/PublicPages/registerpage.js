import React, { useState, useEffect } from "react";
import Nav2 from "../components/common/navbar";
import Footer from "../components/common/footer";

import RegisterForm from "../components/register/form";
import Verify from "../components/register/verify";

const RegisterPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [mobileNumber, setMobileNumber] = useState();

  return (
    <>
      <Nav2 />
      <div style={{minHeight: '70vh'}}>

      {isVerified ? <RegisterForm mobileNumber={mobileNumber} /> : <Verify setIsVerified={setIsVerified} setMobileNumber={setMobileNumber} />}

      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
