import React, { useRef, useState } from "react";
import "./PopUpFullWidth.css";
import favicon from "../../assets/icons/favicon.ico";
import HomeUser from "../HomeHeader/HomeUser";
import { useDispatch, useSelector } from "react-redux";
import usePopupClose from "../../hooks/usePopupClose";
import { logOut } from "../../redux/auth/authAction";
import { Link } from "react-router-dom";

const PopUpFullWidth = ({ setFullWidthPopUp, children }) => {
  const [userMenu, setUserMenu] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const dropMenu = useRef(null);

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };

  usePopupClose(dropMenu, setUserMenu);
  return (
    <div className="pop-up-full-width-wrap">
      <div className="popup-info-wrap">
        <div className="close-featured">
          <i
            class="fa-solid fa-xmark"
            onClick={() => setFullWidthPopUp(false)}
          ></i>
          <Link to="/">
            <img style={{ cursor: "pointer" }} src={favicon} alt="" />
          </Link>
        </div>
        <div className="popup-info">
          <HomeUser
            userMenu={userMenu}
            setUserMenu={setUserMenu}
            user={user}
            dropMenu={dropMenu}
            handleLogOut={handleLogOut}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default PopUpFullWidth;
