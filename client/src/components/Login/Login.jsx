import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import createToast from "../../utility/toast";
import { allUsers, userLogin } from "../../redux/auth/authAction";

const Login = ({ setRegister }) => {
  const { user, users } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    auth: "",
    password: "",
  });

  // password show hide
  const [pass, setPass] = useState(true);

  const handleShowHide = (e) => {
    setPass(!pass);
  };

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    if (!input.auth || !input.password) {
      createToast("All fields are required", "warn");
    } else {
      dispatch(
        userLogin({ auth: input.auth, password: input.password }, navigate)
      );
    }
  };

  return (
    <>
      <div className="auth-box">
        <form onSubmit={handleUserLogin}>
          <div className="auth-form">
            <input
              type="text"
              value={input.auth}
              name="auth"
              onChange={handleInputChange}
              placeholder="Email address or phone number"
            />
          </div>
          <div className="auth-form">
            <div className="eye">
              <input
                type={pass ? "password" : "text"}
                value={input.password}
                name="password"
                onChange={handleInputChange}
                placeholder="Password"
              />

              <i
                id="eye-icon"
                class={pass ? "fa fa-eye-slash" : "fa fa-eye"}
                onClick={handleShowHide}
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <div className="auth-form">
            <button type="submit">Log In</button>
          </div>
        </form>

        <Link to="/forgot-password">Forgotten password?</Link>

        <div className="divider"></div>

        <button onClick={() => setRegister(true)}>Create New Account</button>
      </div>
    </>
  );
};

export default Login;
