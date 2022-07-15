import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";

const paymentAdvanceUnitSlice = createSlice({
  name: "paymentAdvanceUnit",
  initialState: {
    postPaymentAdvanceUnit: [],
    paymentAdvanceUnit: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    paymentAdvanceUnitSetData: (state, action) => {
      state.paymentAdvanceUnit = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    paymentAdvanceUnitFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    paymentAdvanceUnitLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    paymentAdvanceUnitPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    paymentAdvanceUnitUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postPaymentAdvanceUnitDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postPaymentAdvanceUnitDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postPaymentAdvanceUnit = action.payload;
    },
    updatePaymentAdvanceUnitDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updatePaymentAdvanceUnitDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postPaymentAdvanceUnit = action.payload;
    },
  },
});

export const {
  paymentAdvanceUnitSetData,
  paymentAdvanceUnitFailData,
  paymentAdvanceUnitLoading,
  paymentAdvanceUnitPostLoading,
  paymentAdvanceUnitUpdateLoading,
  postPaymentAdvanceUnitDataFail,
  postPaymentAdvanceUnitDataSuccess,
  updatePaymentAdvanceUnitDataFail,
  updatePaymentAdvanceUnitDataSuccess,
} = paymentAdvanceUnitSlice.actions;

export default paymentAdvanceUnitSlice.reducer;

export const url = "/advance-unit";

export const paymentAdvanceUnitGetData = (data) => async (dispatch) => {
  dispatch(paymentAdvanceUnitLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(paymentAdvanceUnitSetData(response.data));
  } catch (error) {
    dispatch(paymentAdvanceUnitFailData(error.message));
  }
};

export const postPaymentAdvanceUnitData =
  (data, paymentAdvanceUnit, toggle, setSubmitting) => async (dispatch) => {
    dispatch(paymentAdvanceUnitPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, paymentAdvanceUnit, {
        headers: myheader,
      });
      dispatch(postPaymentAdvanceUnitDataSuccess(response.data));
      dispatch(paymentAdvanceUnitGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created PaymentAdvanceUnit",
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
      dispatch(postPaymentAdvanceUnitDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updatePaymentAdvanceUnitData =
  (data, paymentAdvanceUnit, toggle, setSubmitting) => async (dispatch) => {
    dispatch(paymentAdvanceUnitUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(
        url + `/${data.id}`,
        paymentAdvanceUnit,
        {
          headers: myheader,
        }
      );

      dispatch(updatePaymentAdvanceUnitDataSuccess(response.data));
      dispatch(paymentAdvanceUnitGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated PaymentAdvanceUnit",
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
      dispatch(updatePaymentAdvanceUnitDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deletePaymentAdvanceUnit = (id, data) => async (dispatch) => {
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
      dispatch(paymentAdvanceUnitGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};
