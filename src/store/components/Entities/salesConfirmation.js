import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";
import moment from "moment";
import { isEmpty } from "./../../../Helpers/helper";

const salesConfirmationSlice = createSlice({
  name: "salesConfirmation",
  initialState: {
    postSalesConfirmation: [],
    salesConfirmation: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    SetData: (state, action) => {
      state.salesConfirmation = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    FailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    Loading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    PostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    UpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postSalesConfirmation = action.payload;
    },
    updateDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postSalesConfirmation = action.payload;
    },
  },
});

export const {
  SetData,
  FailData,
  Loading,
  PostLoading,
  UpdateLoading,
  postDataFail,
  postDataSuccess,
  updateDataFail,
  updateDataSuccess,
} = salesConfirmationSlice.actions;

export default salesConfirmationSlice.reducer;

const url = "sales-confirmation";
const timeDifferenceInMinutes = 120;

export const salesConfirmationGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.salesConfirmation;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }

    dispatch(Loading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      console.log("response", response);
      dispatch(SetData(response.data));
    } catch (error) {
      dispatch(FailData(error.message));
    }
  };

export const postSalesConfirmationData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(PostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      dispatch(postDataSuccess(response.data));
      dispatch(salesConfirmationGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created SalesConfirmation",
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
      dispatch(postDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateSalesConfirmationData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(UpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/${data.id}?_method=PUT`, user, {
        headers: myheader,
      });

      dispatch(updateDataSuccess(response.data));
      dispatch(salesConfirmationGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated SalesConfirmation",
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
      dispatch(updateDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteSalesConfirmation = (id, data) => async (dispatch) => {
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
      dispatch(salesConfirmationGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
