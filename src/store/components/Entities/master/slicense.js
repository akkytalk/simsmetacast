import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "shared/axios";
import Swal from "sweetalert2";

const licenseSlice = createSlice({
  name: "license",
  initialState: {
    postLicense: [],
    license: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    licenseSetData: (state, action) => {
      state.license = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    licenseFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    licenseLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    licensePostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    licenseUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postLicenseDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postLicenseDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postLicense = action.payload;
    },
    updateLicenseDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateLicenseDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postLicense = action.payload;
    },
  },
});

export const {
  licenseSetData,
  licenseFailData,
  licenseLoading,
  licensePostLoading,
  licenseUpdateLoading,
  postLicenseDataFail,
  postLicenseDataSuccess,
  updateLicenseDataFail,
  updateLicenseDataSuccess,
} = licenseSlice.actions;

export default licenseSlice.reducer;

const url = "/licenses";
const timeDifferenceInMinutes = 120;

export const licenseGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.master.license;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }
    dispatch(licenseLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(licenseSetData(response.data));
    } catch (error) {
      dispatch(licenseFailData(error.message));
    }
  };

export const postLicenseData =
  (data, license, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(licensePostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, license, {
        headers: myheader,
      });
      dispatch(postLicenseDataSuccess(response.data));
      dispatch(licenseGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created License",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (toggle) {
          toggle();
        }
        if (setSubmitting) {
          setSubmitting(false);
        }
      });
    } catch (error) {
      dispatch(postLicenseDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateLicenseData =
  (data, license, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(licenseUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, license, {
        headers: myheader,
      });

      dispatch(updateLicenseDataSuccess(response.data));
      dispatch(licenseGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated License",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        if (toggle) {
          toggle();
        }
      });
    } catch (error) {
      dispatch(updateLicenseDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteLicense = (id, data) => async (dispatch) => {
  let updateLastFetch = true;
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.delete(url + `/${id}`, {
      headers: myheader,
    });
    Swal.fire("Deleted!", "Your file has been deleted.", "success").then(() => {
      dispatch(licenseGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
