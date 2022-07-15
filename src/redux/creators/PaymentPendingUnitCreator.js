import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const paymentPendingUnitSetData = (paymentPendingUnit) => {
  return {
    type: actionType.PAYMENT_PENDING_UNIT_SET_DATA,
    paymentPendingUnit: paymentPendingUnit,
  };
};

export const paymentPendingUnitFailData = (error) => {
  return {
    type: actionType.PAYMENT_PENDING_UNIT_FAIL_DATA,
    error: error,
  };
};

export const paymentPendingUnitLoading = () => {
  return {
    type: actionType.PAYMENT_PENDING_UNIT_LOADING,
  };
};

export const paymentPendingUnitGetData = (data) => {
  return (dispatch) => {
    dispatch(paymentPendingUnitLoading());
    axios
      .get(baseUrl + "pending-unit", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(paymentPendingUnitSetData(res.data));
      })

      .catch((error) => dispatch(paymentPendingUnitFailData(error)));
  };
};

export const deletePaymentPendingUnitFail = (error) => {
  return {
    type: actionType.DELETE_PAYMENT_PENDING_UNIT_FAIL,
    error: error,
  };
};

export const deletePaymentPendingUnit = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `pending-unit/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Payment Pending Unit!").then(() => {
            dispatch(paymentPendingUnitGetData(data));
          });
        })
        .catch((error) => dispatch(deletePaymentPendingUnitFail()));
    }
  };
};

export const postPaymentPendingUnitDataStart = () => {
  return {
    type: actionType.POST_PAYMENT_PENDING_UNIT_DATA_START,
  };
};

export const postPaymentPendingUnitDataFail = (error) => {
  return {
    type: actionType.POST_PAYMENT_PENDING_UNIT_DATA_FAIL,
    error: error,
  };
};

export const postPaymentPendingUnitDataSuccess = (success) => {
  return {
    type: actionType.POST_PAYMENT_PENDING_UNIT_DATA_SUCCESS,
    success: success,
  };
};

export const paymentPendingUnitPostLoading = () => {
  return {
    type: actionType.PAYMENT_PENDING_UNIT_POST_LOADING,
  };
};

export const postPaymentPendingUnitData = (
  data,
  user,
  toggle,
  setSubmitting
) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postPaymentPendingUnitDataStart());
    dispatch(paymentPendingUnitPostLoading());
    axios
      .post(baseUrl + "pending-unit", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postPaymentPendingUnitDataSuccess(res.data));
        dispatch(paymentPendingUnitGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Payment Pending Unit",
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
        dispatch(postPaymentPendingUnitDataFail(error));
      });
  };
};

export const updatePaymentPendingUnitDataStart = () => {
  return {
    type: actionType.UPDATE_PAYMENT_PENDING_UNIT_DATA_START,
  };
};

export const paymentPendingUnitUpdateLoading = () => {
  return {
    type: actionType.PAYMENT_PENDING_UNIT_UPDATE_LOADING,
  };
};

export const updatePaymentPendingUnitDataFail = (error) => {
  return {
    type: actionType.UPDATE_PAYMENT_PENDING_UNIT_DATA_FAIL,
    error: error,
  };
};

export const updatePaymentPendingUnitDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_PAYMENT_PENDING_UNIT_DATA_SUCCESS,
    success: success,
  };
};

export const updatePaymentPendingUnitData = (
  data,
  user,
  toggle,
  setSubmitting
) => {
  return (dispatch) => {
    dispatch(updatePaymentPendingUnitDataStart());
    dispatch(paymentPendingUnitUpdateLoading());

    axios
      .put(baseUrl + `pending-unit/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updatePaymentPendingUnitDataSuccess(res.data));
        dispatch(paymentPendingUnitGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Payment Pending Unit",
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
        dispatch(updatePaymentPendingUnitDataFail(error));
      });
  };
};
