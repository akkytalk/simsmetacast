import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const paymentAdvanceUnitSetData = (paymentAdvanceUnit) => {
  return {
    type: actionType.PAYMENT_ADVANCE_UNIT_SET_DATA,
    paymentAdvanceUnit: paymentAdvanceUnit,
  };
};

export const paymentAdvanceUnitFailData = (error) => {
  return {
    type: actionType.PAYMENT_ADVANCE_UNIT_FAIL_DATA,
    error: error,
  };
};

export const paymentAdvanceUnitLoading = () => {
  return {
    type: actionType.PAYMENT_ADVANCE_UNIT_LOADING,
  };
};

export const paymentAdvanceUnitGetData = (data) => {
  return (dispatch) => {
    dispatch(paymentAdvanceUnitLoading());

    axios
      .get(baseUrl + "advance-unit", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(paymentAdvanceUnitSetData(res.data));
      })

      .catch((error) => dispatch(paymentAdvanceUnitFailData(error)));
  };
};

export const deletePaymentAdvanceUnitFail = (error) => {
  return {
    type: actionType.DELETE_PAYMENT_ADVANCE_UNIT_FAIL,
    error: error,
  };
};

export const deletePaymentAdvanceUnit = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `advance-unit/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted payment Advance Unit!").then(() => {
            dispatch(paymentAdvanceUnitGetData(data));
          });
        })
        .catch((error) => dispatch(deletePaymentAdvanceUnitFail()));
    }
  };
};

export const postPaymentAdvanceUnitDataStart = () => {
  return {
    type: actionType.POST_PAYMENT_ADVANCE_UNIT_DATA_START,
  };
};

export const postPaymentAdvanceUnitDataFail = (error) => {
  return {
    type: actionType.POST_PAYMENT_ADVANCE_UNIT_DATA_FAIL,
    error: error,
  };
};

export const postPaymentAdvanceUnitDataSuccess = (success) => {
  return {
    type: actionType.POST_PAYMENT_ADVANCE_UNIT_DATA_SUCCESS,
    success: success,
  };
};

export const paymentAdvanceUnitPostLoading = () => {
  return {
    type: actionType.PAYMENT_ADVANCE_UNIT_POST_LOADING,
  };
};

export const postPaymentAdvanceUnitData = (
  data,
  user,
  toggle,
  setSubmitting
) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postPaymentAdvanceUnitDataStart());
    dispatch(paymentAdvanceUnitPostLoading());
    axios
      .post(baseUrl + "advance-unit", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postPaymentAdvanceUnitDataSuccess(res.data));
        dispatch(paymentAdvanceUnitGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created payment Advance Unit",
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
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(postPaymentAdvanceUnitDataFail(error));
      });
  };
};

export const updatePaymentAdvanceUnitDataStart = () => {
  return {
    type: actionType.UPDATE_PAYMENT_ADVANCE_UNIT_DATA_START,
  };
};

export const paymentAdvanceUnitUpdateLoading = () => {
  return {
    type: actionType.PAYMENT_ADVANCE_UNIT_UPDATE_LOADING,
  };
};

export const updatePaymentAdvanceUnitDataFail = (error) => {
  return {
    type: actionType.UPDATE_PAYMENT_ADVANCE_UNIT_DATA_FAIL,
    error: error,
  };
};

export const updatePaymentAdvanceUnitDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_PAYMENT_ADVANCE_UNIT_DATA_SUCCESS,
    success: success,
  };
};

export const updatePaymentAdvanceUnitData = (
  data,
  user,
  toggle,
  setSubmitting
) => {
  return (dispatch) => {
    dispatch(updatePaymentAdvanceUnitDataStart());
    dispatch(paymentAdvanceUnitUpdateLoading());

    axios
      .put(baseUrl + `advance-unit/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updatePaymentAdvanceUnitDataSuccess(res.data));
        dispatch(paymentAdvanceUnitGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated payment Advance Unit",
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
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(updatePaymentAdvanceUnitDataFail(error));
      });
  };
};
