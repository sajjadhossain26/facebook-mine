import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import crossBtn from "../../assets/icons/cross.png";
import { userRegister } from "../../redux/auth/authAction";
import createToast from "../../utility/toast";
import { useNavigate } from "react-router-dom";

// Date of registration
let day = [];
for (let i = 1; i <= 31; i++) {
  day.push(i);
}

// Month of registration
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Year of registration
const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);
// current date
const date = new Date();

const Register = ({ setRegister }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fname: "",
    sname: "",
    auth: "",
    password: "",
    day: date.getDate(),
    month: month[date.getMonth()],
    year: date.getFullYear(),
    gender: "",
  });
  // custom gender field
  const [field, setField] = useState(false);

  // input state update
  const handleInputChange = (e) => {
    e.target.value === "Custom" ? setField(true) : setField(false);
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    const fieldName = e.target;

    if (!e.target.value) {
      fieldName.classList.add("border-error");
      fieldName.classList.remove("toltip");
    } else {
      fieldName.classList.remove("border-error");
      fieldName.classList.remove("toltip");
    }
  };

  // input validate
  const handleInputValidate = (e) => {
    const fieldName = e.target;
    if (!e.target.value) {
      fieldName.classList.add("border-error");
      fieldName.classList.remove("toltip");
    } else {
      fieldName.classList.remove("border-error");
    }
  };

  // handle input focus
  const handleInputFocus = (e) => {
    const fieldName = e.target;

    if (!e.target.value) {
      fieldName.classList.remove("border-error");
      fieldName.classList.add("toltip");
    }
  };

  // handle Register
  const handleRegister = (e) => {
    e.preventDefault();
    //  check vailidation
    const { fname, sname, emailorMobile, password, day, month, year, gender } =
      input;
    if (!fname || !sname || !emailorMobile || !password || !gender) {
      createToast("All fields are required");
    } else {
      dispatch(
        userRegister(
          {
            first_name: fname,
            sur_name: sname,
            auth: emailorMobile,
            password: password,
            gender: gender,
            birth_date: day,
            birth_month: month,
            birth_year: year,
          },
          setInput,
          e,
          setRegister,
          navigate
        )
      );
    }
  };

  return (
    <>
      <div className="blur-box">
        <div className="sign-up-card">
          <div className="sign-up-header">
            <div className="sign-up-content">
              <span>Sign Up</span>
              <span>It's quick and easy.</span>
            </div>
            <button onClick={() => setRegister(false)}>
              <img src={crossBtn} alt="" />
            </button>
          </div>
          <div className="sign-up-body">
            <form onSubmit={handleRegister}>
              <div className="reg-form-inline">
                <div className="reg-form custom-input">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={input.fname}
                    name="fname"
                    onChange={handleInputChange}
                    onBlur={handleInputValidate}
                    onFocus={handleInputFocus}
                  />
                </div>
                <div className="reg-form custom-input">
                  <input
                    type="text"
                    placeholder="Surname"
                    value={input.sname}
                    name="sname"
                    onChange={handleInputChange}
                    onBlur={handleInputValidate}
                    onFocus={handleInputFocus}
                  />
                </div>
              </div>
              <div className="reg-form custom-tolkit">
                <input
                  type="text"
                  placeholder="Mobile number or email address"
                  value={input.emailorMobile}
                  name="emailorMobile"
                  onChange={handleInputChange}
                  onBlur={handleInputValidate}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="reg-form custom-tolkit2">
                <input
                  type="text"
                  placeholder="New password"
                  value={input.password}
                  name="password"
                  onChange={handleInputChange}
                  onBlur={handleInputValidate}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="reg-form">
                <span>Date of birth</span>
                <div className="reg-form-select">
                  <select name="day" onChange={handleInputChange}>
                    {day.map((item, index) => (
                      <option
                        selected={item === input.day ? true : false}
                        key={index}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                  <select name="month" class="" onChange={handleInputChange}>
                    {month.map((item, index) => (
                      <option
                        selected={item === input.month ? true : false}
                        key={index}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                  <select name="year" class="" onChange={handleInputChange}>
                    {years.map((item, index) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="reg-form">
                <span>Gender</span>
                <div className="reg-form-select">
                  <label>
                    Female
                    <input
                      onChange={handleInputChange}
                      value="Female"
                      type="radio"
                      name="gender"
                    />
                  </label>
                  <label>
                    Male
                    <input
                      onChange={handleInputChange}
                      value="Male"
                      type="radio"
                      name="gender"
                    />
                  </label>
                  <label>
                    Custom
                    <input
                      onChange={handleInputChange}
                      value="Custom"
                      type="radio"
                      name="gender"
                    />
                  </label>
                </div>
              </div>
              {field ? (
                <div className="reg-form">
                  <input type="text" placeholder="Gender (Optional)" />
                </div>
              ) : (
                ""
              )}

              <div className="reg-form">
                <p>
                  People who use our service may have uploaded your contact
                  information to Facebook. <a href="#">Learn more.</a>
                </p>
              </div>
              <div className="reg-form">
                <p>
                  By clicking Sign Up, you agree to our <a href="#">Terms</a>,{" "}
                  <a href="#">Privacy Policy</a> and{" "}
                  <a href="#">Cookies Policy</a>. You may receive SMS
                  notifications from us and can opt out at any time.
                </p>
              </div>

              <div className="reg-form">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
