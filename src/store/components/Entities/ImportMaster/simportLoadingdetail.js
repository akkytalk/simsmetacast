import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";
import moment from "moment";

const importLoadingdetailSlice = createSlice({
  name: "importLoadingdetail",
  initialState: {
    importLoadingdetail: [],
    postImportLoadingdetail: [],
    currentImportLoadingdetail: {},
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    importLoadingdetailSetData: (state, action) => {
      state.importLoadingdetail = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },

    importLoadingdetailFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    importLoadingdetailLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    importLoadingdetailPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    importLoadingdetailUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postImportLoadingdetailDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postImportLoadingdetailDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postImportLoadingdetail = action.payload;
    },
    updateImportLoadingdetailDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateImportLoadingdetailDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postImportLoadingdetail = action.payload;
    },
  },
});

export const {
  importLoadingdetailSetData,
  importLoadingdetailFailData,
  importLoadingdetailLoading,
  importLoadingdetailPostLoading,
  importLoadingdetailUpdateLoading,
  postImportLoadingdetailDataFail,
  postImportLoadingdetailDataSuccess,
  updateImportLoadingdetailDataFail,
  updateImportLoadingdetailDataSuccess,
} = importLoadingdetailSlice.actions;

export default importLoadingdetailSlice.reducer;

const url = "/loading-details";
const timeDifferenceInMinutes = 120;

export const importLoadingdetailGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.importer?.importLoadingdetail;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }

    dispatch(importLoadingdetailLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(importLoadingdetailSetData(response.data));
    } catch (error) {
      dispatch(importLoadingdetailFailData(error.message));
    }
  };

export const postImportLoadingdetailData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(importLoadingdetailPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      // "Content-Type": "multipart/form-data",
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      dispatch(postImportLoadingdetailDataSuccess(response.data));
      dispatch(importLoadingdetailGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created ImportLoadingdetail",
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
      dispatch(postImportLoadingdetailDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateImportLoadingdetailData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(importLoadingdetailUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/${data.id}?_method=PUT`, user, {
        headers: myheader,
      });

      dispatch(updateImportLoadingdetailDataSuccess(response.data));
      dispatch(importLoadingdetailGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated ImportLoadingdetail",
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
      dispatch(updateImportLoadingdetailDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteImportLoadingdetail = (id, data) => async (dispatch) => {
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
      dispatch(importLoadingdetailGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
