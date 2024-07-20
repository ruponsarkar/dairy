import React, {useState, useEffect} from "react";
import Nav2 from "../components/common/navbar";

import RegisterForm from "../components/register/form";
import Verify from "../components/register/verify";

const RegisterPage = () => {

    const [isVerified, setIsVerified] = useState(false)

  return (
    <>
      <Nav2 />
      {isVerified ? 
      <RegisterForm /> 
      :
      <Verify setIsVerified={setIsVerified}/>
      }

    </>
  );
};

export default RegisterPage;
