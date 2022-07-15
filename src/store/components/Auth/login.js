import { createSlice } from "@reduxjs/toolkit";
import axios from "../../../shared/axios";
import customToast from "./../../../Helpers/customToast";

const loginSlice = createSlice({
  name: `auth`,
  initialState: { isLoading: false, errMess: null, login: [] },
  reducers: {
    loginSuccess: (state, action) => {
      state.login = action.payload;
      state.isLoading = false;
      state.errMess = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.errMess = action.payload;
    },
    loginLoader: (state, action) => {
      state.isLoading = true;
      state.errMess = null;
    },
    logout: (state, action) => {
      state.isLoading = false;
      state.errMess = null;
      state.login = [];
    },
  },
});

export const { loginSuccess, loginFailure, loginLoader, logout } =
  loginSlice.actions;

export default loginSlice.reducer;

const url = "/login";

export const postLogin = (data, setSubmitting) => async (dispatch) => {
  dispatch(loginLoader());
  try {
    const myheader = new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    });
    const response = await axios.post(url, data, { headers: myheader });
    dispatch(loginSuccess(response.data));
    customToast(
      "success",
      `Login Successful ${response.data.user?.name}`,
      "top-end",
      1500
    );
    if (setSubmitting) {
      setSubmitting(false);
    }
    // if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    dispatch(loginFailure(error.message));
    customToast("error", `Login Failed ${error.message}`, "top-end", 1500);
    if (setSubmitting) {
      setSubmitting(false);
    }
    // if (onError) dispatch({ type: onError, payload: error.message });
  }
};
