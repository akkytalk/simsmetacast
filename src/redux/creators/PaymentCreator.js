import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const paymentSetData = (payment) => {
  return {
    type: actionType.PAYMENT_SET_DATA,
    payment: payment,
  };
};

export const paymentFailData = (error) => {
  return {
    type: actionType.PAYMENT_FAIL_DATA,
    error: error,
  };
};

export const paymentLoading = () => {
  return {
    type: actionType.PAYMENT_LOADING,
  };
};

export const paymentGetData = (data) => {
  return (dispatch) => {
    dispatch(paymentLoading());
    axios
      .get(baseUrl + "get-payments", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(paymentSetData(res.data));
      })

      .catch((error) => dispatch(paymentFailData(error)));
  };
};

export const deletePaymentFail = (error) => {
  return {
    type: actionType.DELETE_PAYMENT_FAIL,
    error: error,
  };
};

export const deletePayment = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `get-payments/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Payment!").then(() => {
            dispatch(paymentGetData(data));
          });
        })
        .catch((error) => dispatch(deletePaymentFail()));
    }
  };
};

export const postPaymentDataStart = () => {
  return {
    type: actionType.POST_PAYMENT_DATA_START,
  };
};

export const postPaymentDataFail = (error) => {
  return {
    type: actionType.POST_PAYMENT_DATA_FAIL,
    error: error,
  };
};

export const postPaymentDataSuccess = (success) => {
  return {
    type: actionType.POST_PAYMENT_DATA_SUCCESS,
    success: success,
  };
};

export const paymentPostLoading = () => {
  return {
    type: actionType.PAYMENT_POST_LOADING,
  };
};

export const postPaymentData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postPaymentDataStart());
    dispatch(paymentPostLoading());
    axios
      .post(baseUrl + "get-payments", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postPaymentDataSuccess(res.data));
        dispatch(paymentGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Payment",
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
        dispatch(postPaymentDataFail(error));
      });
  };
};

export const updatePaymentDataStart = () => {
  return {
    type: actionType.UPDATE_PAYMENT_DATA_START,
  };
};

export const paymentUpdateLoading = () => {
  return {
    type: actionType.PAYMENT_UPDATE_LOADING,
  };
};

export const updatePaymentDataFail = (error) => {
  return {
    type: actionType.UPDATE_PAYMENT_DATA_FAIL,
    error: error,
  };
};

export const updatePaymentDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_PAYMENT_DATA_SUCCESS,
    success: success,
  };
};

export const updatePaymentData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updatePaymentDataStart());
    dispatch(paymentUpdateLoading());

    axios
      .put(baseUrl + `get-payments/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updatePaymentDataSuccess(res.data));
        dispatch(paymentGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Payment",
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
        dispatch(updatePaymentDataFail(error));
      });
  };
};
