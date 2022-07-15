import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";

const paymentPendingUnitSlice = createSlice({
  name: "paymentPendingUnit",
  initialState: {
    postPaymentPendingUnit: [],
    paymentPendingUnit: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    paymentPendingUnitSetData: (state, action) => {
      state.paymentPendingUnit = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    paymentPendingUnitFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    paymentPendingUnitLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    paymentPendingUnitPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    paymentPendingUnitUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postPaymentPendingUnitDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postPaymentPendingUnitDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postPaymentPendingUnit = action.payload;
    },
    updatePaymentPendingUnitDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updatePaymentPendingUnitDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postPaymentPendingUnit = action.payload;
    },
  },
});

export const {
  paymentPendingUnitSetData,
  paymentPendingUnitFailData,
  paymentPendingUnitLoading,
  paymentPendingUnitPostLoading,
  paymentPendingUnitUpdateLoading,
  postPaymentPendingUnitDataFail,
  postPaymentPendingUnitDataSuccess,
  updatePaymentPendingUnitDataFail,
  updatePaymentPendingUnitDataSuccess,
} = paymentPendingUnitSlice.actions;

export default paymentPendingUnitSlice.reducer;

export const url = "/pending-unit";

export const paymentPendingUnitGetData = (data) => async (dispatch) => {
  dispatch(paymentPendingUnitLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(paymentPendingUnitSetData(response.data));
  } catch (error) {
    dispatch(paymentPendingUnitFailData(error.message));
  }
};

export const postPaymentPendingUnitData =
  (data, paymentPendingUnit, toggle, setSubmitting) => async (dispatch) => {
    dispatch(paymentPendingUnitPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, paymentPendingUnit, {
        headers: myheader,
      });
      dispatch(postPaymentPendingUnitDataSuccess(response.data));
      dispatch(paymentPendingUnitGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created PaymentPendingUnit",
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
      dispatch(postPaymentPendingUnitDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updatePaymentPendingUnitData =
  (data, paymentPendingUnit, toggle, setSubmitting) => async (dispatch) => {
    dispatch(paymentPendingUnitUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(
        url + `/${data.id}`,
        paymentPendingUnit,
        {
          headers: myheader,
        }
      );

      dispatch(updatePaymentPendingUnitDataSuccess(response.data));
      dispatch(paymentPendingUnitGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated PaymentPendingUnit",
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
      dispatch(updatePaymentPendingUnitDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deletePaymentPendingUnit = (id, data) => async (dispatch) => {
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
      dispatch(paymentPendingUnitGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};
