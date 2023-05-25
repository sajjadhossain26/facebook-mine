/**
 * Create auth reducer
 */

import {
  ADD_FRIEND,
  COVER_PHOTO_UPLOAD,
  FEATURED_COLLECTION_SLIDER,
  GET_ALL_USER,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOG_OUT,
  POST_UPDATE,
  PROFILE_PHOTO_UPLOAD,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  TOKEN_USER_FAILED,
  TOKEN_USER_SUCCESS,
  UPDATE_USERS,
  USER_PROFILE_UPDATE,
} from "./actionType";
import initialState from "./initialState";

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
      };

    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        user: null,
        loginState: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        loginState: true,
      };

    case TOKEN_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loginState: true,
      };

    case TOKEN_USER_FAILED:
      return {
        ...state,
        user: null,
        loginState: false,
      };
    case LOG_OUT:
      return {
        ...state,
        user: null,
        loginState: false,
      };

    case USER_PROFILE_UPDATE:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case FEATURED_COLLECTION_SLIDER:
      return {
        ...state,
        user: payload,
      };

    case PROFILE_PHOTO_UPLOAD:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case COVER_PHOTO_UPLOAD:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case GET_ALL_USER:
      return {
        ...state,
        users: payload,
      };

    case UPDATE_USERS:
      return {
        ...state,
      };

    case ADD_FRIEND:
      return {
        ...state,
        user: payload,
      };

    case POST_UPDATE:
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
