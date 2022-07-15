import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";
import moment from "moment";

const billofEntrySlice = createSlice({
  name: "billofEntry",
  initialState: {
    billofEntry: [],
    postBillofEntry: [],
    currentBillofEntry: {},
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    billofEntrySetData: (state, action) => {
      state.billofEntry = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },

    billofEntryFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    billofEntryLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    billofEntryPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    billofEntryUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postBillofEntryDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postBillofEntryDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postBillofEntry = action.payload;
    },
    updateBillofEntryDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateBillofEntryDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postBillofEntry = action.payload;
    },
  },
});

export const {
  billofEntrySetData,
  billofEntryFailData,
  billofEntryLoading,
  billofEntryPostLoading,
  billofEntryUpdateLoading,
  postBillofEntryDataFail,
  postBillofEntryDataSuccess,
  updateBillofEntryDataFail,
  updateBillofEntryDataSuccess,
} = billofEntrySlice.actions;

export default billofEntrySlice.reducer;

const url = "/bill-entries";
const timeDifferenceInMinutes = 120;

export const billofEntryGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.importer?.billofEntry;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }

    dispatch(billofEntryLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(billofEntrySetData(response.data));
    } catch (error) {
      dispatch(billofEntryFailData(error.message));
    }
  };

export const postBillofEntryData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(billofEntryPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      dispatch(postBillofEntryDataSuccess(response.data));
      dispatch(billofEntryGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created BillofEntry",
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
      dispatch(postBillofEntryDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateBillofEntryData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(billofEntryUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/${data.id}?_method=PUT`, user, {
        headers: myheader,
      });

      dispatch(updateBillofEntryDataSuccess(response.data));
      dispatch(billofEntryGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated BillofEntry",
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
      dispatch(updateBillofEntryDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteBillofEntry = (id, data) => async (dispatch) => {
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
      dispatch(billofEntryGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
