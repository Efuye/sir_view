import "./SignUp.css";
import React from "react";
import SignUpComponent from "../../components/views/SignUp/SignUp";

const SignUp = function SignUp() {
  return (
    <div className="sign-up-page">
      <div className="access-form-container-wrapper">
        <div className="access-form-container">
          <SignUpComponent />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
