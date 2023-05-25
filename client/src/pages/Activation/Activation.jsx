import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import FacebookLogo from "../../assets/icons/facebook.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import {
  activationOTP,
  checkPasswordResetCode,
  resendLink,
  resendPasswordReset,
} from "../../redux/auth/authAction";
import createToast from "../../utility/toast";
import ResetHeader from "../../components/ResetHeader/ResetHeader";

const Activation = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();

  //   Code activation email
  const ActivationEmail = Cookie.get("otp");
  useEffect(() => {
    if (!ActivationEmail) {
      navigate("/");
    }
  });
  const [code, setCode] = useState("");
  const handleActivationCode = (e) => {
    setCode(e.target.value);
  };

  //   Handle code activation cancel
  const handleActivationCancel = (e) => {
    e.preventDefault();
    Cookie.remove("otp");

    navigate("/");
  };

  // Handle code continue
  const handleCodeContinue = (e) => {
    e.preventDefault();
    if (!code) {
      createToast("Please set otp code", "warn");
    } else {
      dispatch(
        activationOTP(
          {
            code: code,
            email: Cookie.get("otp"),
          },
          navigate,
          Cookie
        )
      );
    }
  };

  // handle resend link
  const handleResendLink = (e) => {
    e.preventDefault();
    dispatch(resendLink(ActivationEmail, navigate, Cookie));
  };

  // handle password reset
  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!code) {
      createToast("OTP Code Is Required", "warn");
    } else {
      dispatch(
        checkPasswordResetCode(
          {
            code: code,
            auth: Cookie.get("otp"),
          },
          navigate
        )
      );
    }
  };
  // handle new code reset
  const handleNewCodeReset = (e) => {
    e.preventDefault();
    dispatch(
      resendPasswordReset({
        auth: Cookie.get("otp"),
      })
    );
  };

  return (
    <>
      <ResetHeader />

      <div className="activation-body">
        <div className="body-wrap">
          <div className="card">
            <h3>Enter security code</h3>
            <hr />
            <p>
              Please check your emails for a message with your code. Your code
              is 5 numbers long
            </p>
            <div className="card-input">
              <input type="text" value={code} onChange={handleActivationCode} />
              <div className="card-content">
                <span>We sent your code to:</span>
                <br />
                <span>{ActivationEmail}</span>
              </div>
            </div>
            <hr />

            <div className="card-btn-wrap">
              <div className="card-right-btn">
                <a
                  href="\"
                  onClick={
                    type === "account" ? handleResendLink : handleNewCodeReset
                  }
                >
                  Didn't get a code?
                </a>
              </div>
              <div className="card-left-btn">
                <a href="\" onClick={handleActivationCancel}>
                  Cancel
                </a>
                <a
                  href="\"
                  onClick={
                    type === "account"
                      ? handleCodeContinue
                      : handlePasswordReset
                  }
                >
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

export default Activation;
