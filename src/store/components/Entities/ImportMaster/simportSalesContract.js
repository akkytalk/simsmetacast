import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";
import moment from "moment";

const importSalesContractSlice = createSlice({
  name: "importSalesContract",
  initialState: {
    importSalesContract: [],
    postImportSalesContract: [],
    currentImportSalesContract: {},
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    importSalesContractSetData: (state, action) => {
      state.importSalesContract = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },

    importSalesContractFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    importSalesContractLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    importSalesContractPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    importSalesContractUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postImportSalesContractDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postImportSalesContractDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postImportSalesContract = action.payload;
    },
    updateImportSalesContractDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateImportSalesContractDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postImportSalesContract = action.payload;
    },
  },
});

export const {
  importSalesContractSetData,
  importSalesContractFailData,
  importSalesContractLoading,
  importSalesContractPostLoading,
  importSalesContractUpdateLoading,
  postImportSalesContractDataFail,
  postImportSalesContractDataSuccess,
  updateImportSalesContractDataFail,
  updateImportSalesContractDataSuccess,
} = importSalesContractSlice.actions;

export default importSalesContractSlice.reducer;

const url = "/sale-contracts";
const timeDifferenceInMinutes = 120;

export const importSalesContractGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.importer?.importSalesContract;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }

    dispatch(importSalesContractLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(importSalesContractSetData(response.data));
    } catch (error) {
      dispatch(importSalesContractFailData(error.message));
    }
  };

export const postImportSalesContractData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(importSalesContractPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      dispatch(postImportSalesContractDataSuccess(response.data));
      dispatch(importSalesContractGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created ImportSalesContract",
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
      dispatch(postImportSalesContractDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateImportSalesContractData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(importSalesContractUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/${data.id}?_method=PUT`, user, {
        headers: myheader,
      });

      dispatch(updateImportSalesContractDataSuccess(response.data));
      dispatch(importSalesContractGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated ImportSalesContract",
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
      dispatch(updateImportSalesContractDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteImportSalesContract = (id, data) => async (dispatch) => {
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
      dispatch(importSalesContractGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
