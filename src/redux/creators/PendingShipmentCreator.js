import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const pendingShipmentSetData = (pendingShipment) => {
  return {
    type: actionType.PENDING_SHIPMENT_SET_DATA,
    pendingShipment: pendingShipment,
  };
};

export const pendingShipmentFailData = (error) => {
  return {
    type: actionType.PENDING_SHIPMENT_FAIL_DATA,
    error: error,
  };
};

export const pendingShipmentLoading = () => {
  return {
    type: actionType.PENDING_SHIPMENT_LOADING,
  };
};

export const pendingShipmentGetData = (data) => {
  return (dispatch) => {
    dispatch(pendingShipmentLoading());
    axios
      .get(baseUrl + "get-pending-shipping", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(pendingShipmentSetData(res.data));
      })

      .catch((error) => dispatch(pendingShipmentFailData(error)));
  };
};

export const deletePendingShipmentFail = (error) => {
  return {
    type: actionType.DELETE_PENDING_SHIPMENT_FAIL,
    error: error,
  };
};

export const deletePendingShipment = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `get-pending-shipping/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted PendingShipment!").then(() => {
            dispatch(pendingShipmentGetData(data));
          });
        })
        .catch((error) => dispatch(deletePendingShipmentFail()));
    }
  };
};

export const postPendingShipmentDataStart = () => {
  return {
    type: actionType.POST_PENDING_SHIPMENT_DATA_START,
  };
};

export const postPendingShipmentDataFail = (error) => {
  return {
    type: actionType.POST_PENDING_SHIPMENT_DATA_FAIL,
    error: error,
  };
};

export const postPendingShipmentDataSuccess = (success) => {
  return {
    type: actionType.POST_PENDING_SHIPMENT_DATA_SUCCESS,
    success: success,
  };
};

export const pendingShipmentPostLoading = () => {
  return {
    type: actionType.PENDING_SHIPMENT_POST_LOADING,
  };
};

export const postPendingShipmentData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postPendingShipmentDataStart());
    dispatch(pendingShipmentPostLoading());
    axios
      .post(baseUrl + "get-pending-shipping", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postPendingShipmentDataSuccess(res.data));
        dispatch(pendingShipmentGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Pending Shipment",
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
        dispatch(postPendingShipmentDataFail(error));
      });
  };
};

export const updatePendingShipmentDataStart = () => {
  return {
    type: actionType.UPDATE_PENDING_SHIPMENT_DATA_START,
  };
};

export const pendingShipmentUpdateLoading = () => {
  return {
    type: actionType.PENDING_SHIPMENT_UPDATE_LOADING,
  };
};

export const updatePendingShipmentDataFail = (error) => {
  return {
    type: actionType.UPDATE_PENDING_SHIPMENT_DATA_FAIL,
    error: error,
  };
};

export const updatePendingShipmentDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_PENDING_SHIPMENT_DATA_SUCCESS,
    success: success,
  };
};

export const updatePendingShipmentData = (
  data,
  user,
  toggle,
  setSubmitting
) => {
  return (dispatch) => {
    dispatch(updatePendingShipmentDataStart());
    dispatch(pendingShipmentUpdateLoading());

    axios
      .put(baseUrl + `get-pending-shipping/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updatePendingShipmentDataSuccess(res.data));
        dispatch(pendingShipmentGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated PendingShipment",
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
        dispatch(updatePendingShipmentDataFail(error));
      });
  };
};
