import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import ResetHeader from "../../components/ResetHeader/ResetHeader";
import { changePassword } from "../../redux/auth/authAction";
import createToast from "../../utility/toast";

export const Password = () => {
  const [password, setPassword] = useState("");
  // password show hide
  const [pass, setPass] = useState(true);

  const handleShowHide = (e) => {
    setPass(!pass);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!password) {
      createToast("Password field is required");
    } else {
      dispatch(
        changePassword(
          {
            id: Cookies.get("cpid"),
            code: Cookies.get("cpcode"),
            password,
          },
          navigate
        )
      );
    }
  };
  return (
    <>
      <ResetHeader />
      <div className="reset-area">
        <div className="reset-wraper">
          <div className="reset-box">
            <div className="reset-box-header">
              <span className="title">Choose a new password</span>
            </div>
            <div className="reset-body">
              <p>
                Create a new password that is at least 6 characters long. A
                strong password has a combination of letters, digits and
                punctuation marks.
              </p>
              <div className="code-box">
                <div className="eye">
                  <input
                    className="w-100"
                    type={pass ? "password" : "text"}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    id="eye-icon"
                    class={pass ? "fa fa-eye-slash" : "fa fa-eye"}
                    onClick={handleShowHide}
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </div>
            <div className="reset-footer">
              <a href="#"></a>
              <div className="reset-btns">
                <Link className="cancel" to="/">
                  Skip
                </Link>
                <a className="continue" href="#" onClick={handlePasswordChange}>
                  Continue
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
