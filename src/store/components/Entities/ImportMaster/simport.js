import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";
import moment from "moment";

const importSlice = createSlice({
  name: "import",
  initialState: {
    import: [],
    postImport: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    importSetData: (state, action) => {
      state.import = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    importFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    importLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    importPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    importUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postImportDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postImportDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postImport = action.payload;
    },
    updateImportDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateImportDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postImport = action.payload;
    },
  },
});

export const {
  importSetData,
  importFailData,
  importLoading,
  importPostLoading,
  importUpdateLoading,
  postImportDataFail,
  postImportDataSuccess,
  updateImportDataFail,
  updateImportDataSuccess,
} = importSlice.actions;

export default importSlice.reducer;

const url = "/imports";
const timeDifferenceInMinutes = 120;

export const importGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.importer?.import;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }

    dispatch(importLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(importSetData(response.data));
    } catch (error) {
      dispatch(importFailData(error.message));
    }
  };

export const postImportData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(importPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      dispatch(postImportDataSuccess(response.data));
      dispatch(importGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created Import",
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
      dispatch(postImportDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateImportData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(importUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateImportDataSuccess(response.data));
      dispatch(importGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated Import",
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
      dispatch(updateImportDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteImport = (id, data) => async (dispatch) => {
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
      dispatch(importGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
