import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";
import moment from "moment";

const importClaimSlice = createSlice({
  name: "importClaim",
  initialState: {
    importClaim: [],
    postImportClaim: [],
    currentImportClaim: {},
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    importClaimSetData: (state, action) => {
      state.importClaim = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },

    importClaimFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    importClaimLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    importClaimPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    importClaimUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postImportClaimDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postImportClaimDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postImportClaim = action.payload;
    },
    updateImportClaimDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateImportClaimDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postImportClaim = action.payload;
    },
  },
});

export const {
  importClaimSetData,
  importClaimFailData,
  importClaimLoading,
  importClaimPostLoading,
  importClaimUpdateLoading,
  postImportClaimDataFail,
  postImportClaimDataSuccess,
  updateImportClaimDataFail,
  updateImportClaimDataSuccess,
} = importClaimSlice.actions;

export default importClaimSlice.reducer;

const url = "/claims";
const timeDifferenceInMinutes = 120;

export const importClaimGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.importer?.importClaim;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }

    dispatch(importClaimLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(importClaimSetData(response.data));
    } catch (error) {
      dispatch(importClaimFailData(error.message));
    }
  };

export const postImportClaimData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(importClaimPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      dispatch(postImportClaimDataSuccess(response.data));
      dispatch(importClaimGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created ImportClaim",
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
      dispatch(postImportClaimDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateImportClaimData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(importClaimUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/${data.id}?_method=PUT`, user, {
        headers: myheader,
      });

      dispatch(updateImportClaimDataSuccess(response.data));
      dispatch(importClaimGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated ImportClaim",
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
      dispatch(updateImportClaimDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteImportClaim = (id, data) => async (dispatch) => {
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
      dispatch(importClaimGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
