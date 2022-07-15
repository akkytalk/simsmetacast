import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";
import moment from "moment";

const invoiceSlice = createSlice({
  name: "invoice",
  initialState: {
    invoice: [],
    postInvoice: [],
    currentInvoice: {},
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    invoiceSetData: (state, action) => {
      state.invoice = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },

    invoiceFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    invoiceLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    invoicePostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    invoiceUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postInvoiceDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postInvoiceDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postInvoice = action.payload;
    },
    updateInvoiceDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateInvoiceDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postInvoice = action.payload;
    },
  },
});

export const {
  invoiceSetData,
  invoiceFailData,
  invoiceLoading,
  invoicePostLoading,
  invoiceUpdateLoading,
  postInvoiceDataFail,
  postInvoiceDataSuccess,
  updateInvoiceDataFail,
  updateInvoiceDataSuccess,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

const url = "/invoices";
const timeDifferenceInMinutes = 120;

export const invoiceGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.importer?.invoice;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }

    dispatch(invoiceLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(invoiceSetData(response.data));
    } catch (error) {
      dispatch(invoiceFailData(error.message));
    }
  };

export const postInvoiceData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(invoicePostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      dispatch(postInvoiceDataSuccess(response.data));
      dispatch(invoiceGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created Invoice",
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
      dispatch(postInvoiceDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateInvoiceData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(invoiceUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/${data.id}?_method=PUT`, user, {
        headers: myheader,
      });

      dispatch(updateInvoiceDataSuccess(response.data));
      dispatch(invoiceGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated Invoice",
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
      dispatch(updateInvoiceDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteInvoice = (id, data) => async (dispatch) => {
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
      dispatch(invoiceGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
