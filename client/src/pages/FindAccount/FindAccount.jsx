import React from "react";
import Footer from "../../components/Footer/Footer";
import ResetHeader from "../../components/ResetHeader/ResetHeader";
import user from "../../assets/images/user.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import { isEmail } from "../../utility/validate";
import { hideMobileEmail } from "../../utility/helper";
import axios from "axios";
import createToast from "../../utility/toast";

const FindAccount = () => {
  const [findUser, setFindUser] = useState({
    name: "",
    email: "",
    mobile: "",
    photo: "",
  });
  const userData = JSON.parse(Cookies.get("findUser")) ?? null;
  const navigate = useNavigate();
  // handle not you
  const handleNotYou = (e) => {
    e.preventDefault();
    Cookies.remove("findUser");
    navigate("/forgot-password");
  };

  // handle password reset link
  const handlePasswordResetLink = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/v1/user/send-password-reset", {
        auth: findUser.mobile ?? findUser.email,
      })
      .then((res) => {
        createToast(res.data.message, "success");
        navigate("/activation/reset-password");
      })
      .catch((error) => {
        createToast(error.response.data.message);
      });
  };

  useEffect(() => {
    if (userData) {
      setFindUser({
        name: userData.name,
        email: userData.email ?? null,
        mobile: userData.mobile ?? null,
        photo: userData.photo,
      });
    }
  }, []);

  return (
    <>
      <ResetHeader />
      <div className="reset-area">
        <div className="reset-wraper">
          <div className="reset-box">
            <div className="reset-box-header">
              <span className="title">Reset your password</span>
            </div>
            <div className="reset-body">
              <div className="find-user-account">
                <img
                  src={
                    findUser.photo
                      ? user
                      : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                  }
                  alt=""
                />
                <span>{findUser.name}</span>
                <p>
                  {findUser.email
                    ? `Email : ${hideMobileEmail(findUser.email)}`
                    : `Mobile : ${hideMobileEmail(findUser.mobile)}`}
                </p>
                <p>To reset your account password, please continue</p>
              </div>
            </div>
            <div className="reset-footer">
              <a href="#"></a>
              <div className="reset-btns">
                <a className="cancel" href="#" onClick={handleNotYou}>
                  Not you ?
                </a>
                <a
                  className="continue"
                  href="#"
                  onClick={handlePasswordResetLink}
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

export default FindAccount;
