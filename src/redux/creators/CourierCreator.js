import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";
import { purchaseOrderGetData, purchaseSalesIndentGetData } from ".";

export const courierSetData = (courier) => {
  return {
    type: actionType.COURIERS_SET_DATA,
    courier: courier,
  };
};

export const courierFailData = (error) => {
  return {
    type: actionType.COURIERS_FAIL_DATA,
    error: error,
  };
};

export const courierLoading = () => {
  return {
    type: actionType.COURIERS_LOADING,
  };
};

export const courierGetData = (data) => {
  return (dispatch) => {
    dispatch(courierLoading());
    axios
      .get(baseUrl + "couriers", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(courierSetData(res.data));
      })

      .catch((error) => dispatch(courierFailData(error)));
  };
};

export const deleteCourierFail = (error) => {
  return {
    type: actionType.DELETE_COURIERS_FAIL,
    error: error,
  };
};

export const deleteCourier = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `couriers/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(courierGetData(data));
            }
          );
        })

        .catch((error) => dispatch(deleteCourierFail()));
    }
  };
};

export const postCourierDataStart = () => {
  return {
    type: actionType.POST_COURIERS_DATA_START,
  };
};

export const postCourierDataFail = (error) => {
  return {
    type: actionType.POST_COURIERS_DATA_FAIL,
    error: error,
  };
};

export const postCourierDataSuccess = (success) => {
  return {
    type: actionType.POST_COURIERS_DATA_SUCCESS,
    success: success,
  };
};

export const courierPostLoading = () => {
  return {
    type: actionType.COURIERS_POST_LOADING,
  };
};

export const postCourierData = (data, user, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postCourierDataStart());
    dispatch(courierPostLoading());
    axios
      .post(baseUrl + "couriers", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postCourierDataSuccess(res.data));
        dispatch(courierGetData(data));
        dispatch(purchaseOrderGetData(data));
        dispatch(purchaseSalesIndentGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Courier",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          if (setSubmitting) {
            setSubmitting(false);
          }
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(postCourierDataFail(error));
      });
  };
};

export const updateCourierDataStart = () => {
  return {
    type: actionType.UPDATE_COURIERS_DATA_START,
  };
};

export const courierUpdateLoading = () => {
  return {
    type: actionType.COURIERS_UPDATE_LOADING,
  };
};

export const updateCourierDataFail = (error) => {
  return {
    type: actionType.UPDATE_COURIERS_DATA_FAIL,
    error: error,
  };
};

export const updateCourierDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_COURIERS_DATA_SUCCESS,
    success: success,
  };
};

export const updateCourierData = (data, user, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateCourierDataStart());
    dispatch(courierUpdateLoading());

    axios
      .put(baseUrl + `couriers/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateCourierDataSuccess(res.data));
        dispatch(courierGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Courier",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          if (setSubmitting) {
            setSubmitting(false);
          }
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(updateCourierDataFail(error));
      });
  };
};
