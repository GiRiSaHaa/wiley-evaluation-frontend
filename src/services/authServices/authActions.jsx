import { SUCCESS, FAILURE, LOGIN_REQUEST, LOGOUT_REQUEST } from "./authTypes";
import axios from "axios";

export const authenticateUser = (username, password) => {
  const credentials = {
    username: username,
    password: password,
  };
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    axios
      .post("http://localhost:8080/authenticate", credentials)
      .then((response) => {
        let token = response.data.jwt;
        localStorage.setItem("jwtToken", token);
        dispatch(success(true));
      })
      .catch((error) => {
        dispatch(failure());
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    localStorage.removeItem("jwtToken");
    dispatch(success(false));
  };
};

const success = (isLoggedIn) => {
  return {
    type: SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = () => {
  return {
    type: FAILURE,
    payload: false,
  };
};
