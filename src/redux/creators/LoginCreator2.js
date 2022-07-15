import * as ActionTypes from "../types/ActionTypes";
import axios from "../../shared/axios";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import customToast from "Helpers/customToast";

//Login
export const postLogin = (data, setSubmitting) => (dispatch) => {
  console.log("login data", data);
  dispatch(loginLoading(true));

  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  axios
    .post("/login", data, myheader)
    .then((res) => {
      dispatch(addLogin(res.data));
      customToast(
        "success",
        `Login Successful ${res.data.user?.name}`,
        "top-end",
        1500
      );
      // toast.success(`${res.data.user.name}, Welcome!`);
      if (setSubmitting) {
        setSubmitting(false);
      }
    })
    .catch((error) => {
      dispatch(loginFailed(error));
      if (setSubmitting) {
        setSubmitting(false);
      }
    });
};

//* post Employee login
export const postEmployeeLogin = (data) => (dispatch) => {
  console.log("login data", data);
  dispatch(loginLoading(true));

  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  axios
    .post("/employeelogin", data, myheader)
    .then((res) => {
      dispatch(addLogin(res.data));
      customToast(
        "success",
        `Login Successful ${res.data.Employee?.name}`,
        "top-end",
        1500
      );
      // toast.success(`${res.data.Employee.name}, Welcome!`);
    })
    .catch((error) => {
      dispatch(loginFailed(error));
    });
};

export const loginLoading = () => ({
  type: ActionTypes.LOGIN_LOADING,
});

export const loginFailed = (errmess) => ({
  type: ActionTypes.LOGIN_FAILED,
  payload: errmess,
});

export const addLogin = (login) => ({
  type: ActionTypes.ADD_LOGIN,
  payload: login,
});

//Remove
export const removeLogin = () => ({
  type: ActionTypes.REMOVE_LOGIN,
  payload: [],
});
