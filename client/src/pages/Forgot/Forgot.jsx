import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import ResetHeader from "../../components/ResetHeader/ResetHeader";
import createToast from "../../utility/toast";
import axios from "axios";

const Forgot = () => {
  const [auth, setAuth] = useState("");
  const navigate = useNavigate();

  const findAccount = (e) => {
    setAuth(e.target.value);
  };

  // find user
  const handleFindUser = (e) => {
    if (!auth) {
      createToast("Email or mobile required", "warn");
    } else {
      axios
        .post("/api/v1/user/find-account", {
          auth,
        })
        .then((res) => {
          navigate("/find-account");
        })
        .catch((error) => {
          createToast(error.response.data.message);
        });
    }
  };
  return (
    <>
      <ResetHeader />
      <div className="reset-area">
        <div className="reset-wraper">
          <div className="reset-box">
            <div className="reset-box-header">
              <span className="title">Find Your Account</span>
            </div>
            <div className="reset-body">
              <p>
                Please enter your email address or mobile number to search for
                your account.
              </p>
              <div className="code-box">
                <input
                  className="w-100"
                  type="text"
                  placeholder="Email address or mobile number"
                  value={auth}
                  onChange={findAccount}
                />
              </div>
            </div>
            <div className="reset-footer">
              <a href="#"></a>
              <div className="reset-btns">
                <Link className="cancel" to="/">
                  Cancel
                </Link>
                <Link className="continue" onClick={handleFindUser}>
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forgot;
