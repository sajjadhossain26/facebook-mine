import axios from "axios";
import createToast from "../../utility/toast";
import { LOADER_START } from "../loader/loaderTypes";
import {
  ADD_FRIEND,
  COVER_PHOTO_UPLOAD,
  FEATURED_COLLECTION_SLIDER,
  GET_ALL_USER,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
  POST_UPDATE,
  PROFILE_PHOTO_UPLOAD,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  TOKEN_USER_FAILED,
  TOKEN_USER_REQUEST,
  TOKEN_USER_SUCCESS,
  UPDATE_USERS,
  USER_PROFILE_UPDATE,
} from "./actionType";
import Cookies from "js-cookie";

// user register
export const userRegister =
  (data, setInput, e, setRegister, navigate) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });
      axios
        .post("/api/v1/user/register", data)
        .then((res) => {
          createToast(res.data.message, "success");
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.message,
          });
          setInput({
            fname: "",
            sname: "",
            auth: "",
            password: "",
            day: "",
            month: "",
            year: "",
            gender: "",
          });
          e.target.reset();
          setRegister(false);
          navigate("/activation/account");
        })
        .catch((error) => {
          createToast(error.response.data.message);

          dispatch({
            type: REGISTER_FAILED,
            payload: error.response.data,
          });
        });
    } catch (error) {
      createToast(error.response.data.message);
      dispatch({
        type: REGISTER_FAILED,
        payload: error.response.data,
      });
    }
  };

// User account activation by otp

export const activationOTP =
  ({ code, email }, navigate, Cookie) =>
  async (dispatch) => {
    try {
      axios
        .post("/api/v1/user/code-activate", { code: code, email: email })
        .then((res) => {
          createToast("Account activation successful", "success");
          Cookie.remove("otp");
          navigate("/");
        })
        .catch((error) => {
          createToast(error.response.data.message);
        });
    } catch (error) {
      createToast(error.response.data.message);
    }
  };

// Resend link
export const resendLink = (email, navigate, Cookie) => async (dispatch) => {
  try {
    axios
      .post("/api/v1/user/resend-activate", { auth: email })
      .then((res) => {
        createToast(res.data.message, "success");
      })
      .catch((error) => {
        createToast(error.response.data.message);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

// Check password reset otp
export const checkPasswordResetCode = (data, navigate) => async (dispatch) => {
  try {
    axios
      .post("/api/v1/user/check-password-reset-otp", {
        auth: data.auth,
        code: data.code,
      })
      .then((res) => {
        createToast(res.data.message, "success");
        navigate("/change-password");
      })
      .catch((error) => {
        createToast(error.response.data.message);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

// Change password
export const changePassword = (data, navigate) => async (dispatch) => {
  try {
    await axios
      .post("/api/v1/user/user-password-reset", {
        id: data.id,
        code: data.code,
        password: data.password,
      })
      .then((res) => {
        createToast(res.data.message, "success");
        navigate("/");
      })
      .catch((error) => {
        createToast(error.response.data.message);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

// User login
export const userLogin = (data, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    await axios
      .post("/api/v1/user/login", data)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.user,
        });
        dispatch({
          type: LOADER_START,
        });
        createToast(res.data.message, "success");
        navigate("/");
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILED,
        });
        createToast(error.response.data.message);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

// Resend password reset link
export const resendPasswordReset = (data) => async (dispatch) => {
  try {
    await axios
      .post("/api/v1/user/resend-password-reset", { auth: data.auth })
      .then((res) => {
        createToast(res.data.message, "success");
      })
      .catch((error) => {
        createToast(error.response.data.message);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

// Token check for Logged user
export const tokenUser = (data, navigate) => async (dispatch) => {
  const token = Cookies.get("authToken");
  try {
    dispatch({
      type: TOKEN_USER_REQUEST,
    });
    await axios
      .get("/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: TOKEN_USER_SUCCESS,
          payload: res.data.user,
        });
        dispatch({
          type: LOADER_START,
        });
      })
      .catch((error) => {
        dispatch({
          type: TOKEN_USER_FAILED,
        });
        dispatch(logOut());
      });
  } catch (error) {
    dispatch(logOut());
    dispatch({
      type: TOKEN_USER_FAILED,
    });
    createToast(error.response.data.message);
  }
};

export const logOut = () => (dispatch) => {
  Cookies.remove("authToken");
  dispatch({
    type: LOG_OUT,
  });
};

// Profile bio update
export const profileUpdate = (data, id, setShowBio) => async (dispatch) => {
  try {
    await axios
      .put(`/api/v1/user/profile-update/${id}`, data)
      .then((res) => {
        setShowBio(false);
        dispatch({ type: USER_PROFILE_UPDATE, payload: data });
      })
      .catch((error) => {
        createToast(error.response.data.message);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

// featured update
export const featuredUpdate = (data, id) => async (dispatch) => {
  try {
    await axios
      .post(`/api/v1/user/featured-slider/${id}`, data)
      .then((res) => {
        dispatch({ type: FEATURED_COLLECTION_SLIDER, payload: res.data.user });
      })
      .catch((error) => {
        createToast(error.response.data.message);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

// profile update
export const profilePhotoUpload = (data, id) => async (dispatch) => {
  try {
    await axios
      .put(`/api/v1/user/profile-photo-update/${id}`, data)
      .then((res) => {
        dispatch({
          type: PROFILE_PHOTO_UPLOAD,
          payload: { profile_photo: res.data.user.profile_photo },
        });
      })
      .catch((error) => {
        createToast(error.response.data.message);
        console.log(error);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

// profile update
export const coverPhotoUpload = (data, id) => async (dispatch) => {
  try {
    await axios
      .put(`/api/v1/user/cover-photo-update/${id}`, data)
      .then((res) => {
        dispatch({
          type: COVER_PHOTO_UPLOAD,
          payload: { cover_photo: res.data.user.cover_photo },
        });
        createToast(res.data.message, "success");
      })
      .catch((error) => {
        createToast(error.response.data.message);
        console.log(error);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

// Get all user
export const allUsers = (id) => async (dispatch) => {
  try {
    await axios
      .get(`/api/v1/user/users/${id}`)
      .then((res) => {
        dispatch({
          type: GET_ALL_USER,
          payload: res.data.users,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

// Add Friend
export const addFriend = (receiverId, sender) => async (dispatch) => {
  try {
    await axios
      .get(`/api/v1/user/add-friend/${receiverId}/${sender._id}`)
      .then((res) => {
        dispatch({
          type: ADD_FRIEND,
          payload: res.data.sendUser,
        });
        dispatch({
          type: UPDATE_USERS,
          payload: res.data.receiveUser,
        });
        createToast(res.data.message, "success");
      })
      .catch((error) => {
        createToast(error);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

// Confirm Friend Request
export const confirmFriend = (sender, receiverId) => async (dispatch) => {
  try {
    await axios
      .get(`/api/v1/user/confirm-friend-request/${sender._id}/${receiverId}`)
      .then((res) => {
        dispatch({
          type: ADD_FRIEND,
          payload: res.data.user,
        });
        createToast(res.data.message, "success");
      })
      .catch((error) => {
        createToast(error);
      });
  } catch (error) {
    createToast(error.response.data.message);
  }
};

// Post update
export const postUpdate = (data, id) => async (dispatch) => {
  try {
    await axios
      .post(`/api/v1/user/post/${id}`, data)
      .then((res) => {
        dispatch({ type: POST_UPDATE, payload: res.data.user });

        createToast(res.data.message, "success");
        console.log(res.data);
      })
      .catch((error) => {
        createToast(error.response.data.message);
        console.log(error);
      });
  } catch (error) {
    createToast(error.response.data.message);
    console.log(error);
  }
};
