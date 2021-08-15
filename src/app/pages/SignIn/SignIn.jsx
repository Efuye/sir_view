import "./SignIn.css";
import React from "react";
import SignInComponent from "../../components/views/SignIn/SignIn";

const SignIn = function SignIn() {
  return (
    <div className="sign-in-page">
      <div className="access-form-container-wrapper">
        <div className="access-form-container">
          <SignInComponent />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
