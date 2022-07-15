import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";
import customToast from "Helpers/customToast";

export const portDeliverySetData = (portDelivery) => {
  return {
    type: actionType.PORT_DELIVERY_SET_DATA,
    portDelivery: portDelivery,
  };
};

export const portDeliveryFailData = (error) => {
  return {
    type: actionType.PORT_DELIVERY_FAIL_DATA,
    error: error,
  };
};

export const portDeliveryLoading = () => {
  return {
    type: actionType.PORT_DELIVERY_LOADING,
  };
};

export const portDeliveryGetData = (data) => {
  return (dispatch) => {
    dispatch(portDeliveryLoading());
    axios
      .get(baseUrl + "delivery-port", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(portDeliverySetData(res.data));
      })

      .catch((error) => dispatch(portDeliveryFailData(error)));
  };
};

export const deletePortDeliveryFail = (error) => {
  return {
    type: actionType.DELETE_PORT_DELIVERY_FAIL,
    error: error,
  };
};

export const deletePortDelivery = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `delivery-port/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted PortDelivery!").then(() => {
            dispatch(portDeliveryGetData(data));
          });
        })
        .catch((error) => dispatch(deletePortDeliveryFail()));
    }
  };
};

export const postPortDeliveryDataStart = () => {
  return {
    type: actionType.POST_PORT_DELIVERY_DATA_START,
  };
};

export const postPortDeliveryDataFail = (error) => {
  return {
    type: actionType.POST_PORT_DELIVERY_DATA_FAIL,
    error: error,
  };
};

export const postPortDeliveryDataSuccess = (success) => {
  return {
    type: actionType.POST_PORT_DELIVERY_DATA_SUCCESS,
    success: success,
  };
};

export const portDeliveryPostLoading = () => {
  return {
    type: actionType.PORT_DELIVERY_POST_LOADING,
  };
};

export const postPortDeliveryData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postPortDeliveryDataStart());
    dispatch(portDeliveryPostLoading());
    axios
      .post(baseUrl + "delivery-port", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postPortDeliveryDataSuccess(res.data));
        dispatch(portDeliveryGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created PortDelivery",
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
        dispatch(postPortDeliveryDataFail(error));
      });
  };
};

export const updatePortDeliveryDataStart = () => {
  return {
    type: actionType.UPDATE_PORT_DELIVERY_DATA_START,
  };
};

export const portDeliveryUpdateLoading = () => {
  return {
    type: actionType.PORT_DELIVERY_UPDATE_LOADING,
  };
};

export const updatePortDeliveryDataFail = (error) => {
  return {
    type: actionType.UPDATE_PORT_DELIVERY_DATA_FAIL,
    error: error,
  };
};

export const updatePortDeliveryDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_PORT_DELIVERY_DATA_SUCCESS,
    success: success,
  };
};

export const updatePortDeliveryData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updatePortDeliveryDataStart());
    dispatch(portDeliveryUpdateLoading());

    axios
      .put(baseUrl + `delivery-port/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updatePortDeliveryDataSuccess(res.data));
        dispatch(portDeliveryGetData(data));
        customToast(
          "success",
          `Successful update port of delivery`,
          "top-end",
          1500
        ).then(() => {
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
        dispatch(updatePortDeliveryDataFail(error));
      });
  };
};
