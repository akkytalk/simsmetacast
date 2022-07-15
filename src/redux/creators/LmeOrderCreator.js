import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const lmeOrderSetData = (lmeOrder) => {
  return {
    type: actionType.LME_ORDER_SET_DATA,
    lmeOrder: lmeOrder,
  };
};

export const lmeOrderFailData = (error) => {
  return {
    type: actionType.LME_ORDER_FAIL_DATA,
    error: error,
  };
};

export const lmeOrderLoading = () => {
  return {
    type: actionType.LME_ORDER_LOADING,
  };
};

export const lmeOrderGetData = (data) => {
  return (dispatch) => {
    dispatch(lmeOrderLoading());
    axios
      .get(baseUrl + "lme-fixation", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(lmeOrderSetData(res.data));
      })

      .catch((error) => dispatch(lmeOrderFailData(error)));
  };
};

export const deleteLmeOrderFail = (error) => {
  return {
    type: actionType.DELETE_LME_ORDER_FAIL,
    error: error,
  };
};

export const deleteLmeOrder = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `lme-fixation/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted LmeOrder!").then(() => {
            dispatch(lmeOrderGetData(data));
          });
        })
        .catch((error) => dispatch(deleteLmeOrderFail()));
    }
  };
};

export const postLmeOrderDataStart = () => {
  return {
    type: actionType.POST_LME_ORDER_DATA_START,
  };
};

export const postLmeOrderDataFail = (error) => {
  return {
    type: actionType.POST_LME_ORDER_DATA_FAIL,
    error: error,
  };
};

export const postLmeOrderDataSuccess = (success) => {
  return {
    type: actionType.POST_LME_ORDER_DATA_SUCCESS,
    success: success,
  };
};

export const lmeOrderPostLoading = () => {
  return {
    type: actionType.LME_ORDER_POST_LOADING,
  };
};

export const postLmeOrderData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postLmeOrderDataStart());
    dispatch(lmeOrderPostLoading());
    axios
      .post(baseUrl + "lme-fixation", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postLmeOrderDataSuccess(res.data));
        dispatch(lmeOrderGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created LmeOrder",
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
        dispatch(postLmeOrderDataFail(error));
      });
  };
};

export const updateLmeOrderDataStart = () => {
  return {
    type: actionType.UPDATE_LME_ORDER_DATA_START,
  };
};

export const lmeOrderUpdateLoading = () => {
  return {
    type: actionType.LME_ORDER_UPDATE_LOADING,
  };
};

export const updateLmeOrderDataFail = (error) => {
  return {
    type: actionType.UPDATE_LME_ORDER_DATA_FAIL,
    error: error,
  };
};

export const updateLmeOrderDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_LME_ORDER_DATA_SUCCESS,
    success: success,
  };
};

export const updateLmeOrderData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateLmeOrderDataStart());
    dispatch(lmeOrderUpdateLoading());

    axios
      .put(baseUrl + `lme-fixation/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateLmeOrderDataSuccess(res.data));
        dispatch(lmeOrderGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated LmeOrder",
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
        dispatch(updateLmeOrderDataFail(error));
      });
  };
};
