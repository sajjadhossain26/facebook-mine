import React from "react";
import { Link } from "react-router-dom";
import FacebookLogo from "../../assets/icons/facebook.svg";

const ResetHeader = () => {
  return (
    <>
      <div class="reset-header">
        <div class="reset-header-wraper">
          <div class="reset-logo">
            <Link to={"/"}>
              <img src={FacebookLogo} alt="" />
            </Link>
          </div>
          <div class="login-part">
            <input type="text" placeholder="Email or mobile number" />
            <input type="text" placeholder="Password" />
            <button>Log In</button>
            <Link to="/forgot-password">Forgotten account?</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetHeader;
