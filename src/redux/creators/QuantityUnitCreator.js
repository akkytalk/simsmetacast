import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const quantityUnitSetData = (quantityUnit) => {
  return {
    type: actionType.QUANTITY_UNIT_SET_DATA,
    quantityUnit: quantityUnit,
  };
};

export const quantityUnitFailData = (error) => {
  return {
    type: actionType.QUANTITY_UNIT_FAIL_DATA,
    error: error,
  };
};

export const quantityUnitLoading = () => {
  return {
    type: actionType.QUANTITY_UNIT_LOADING,
  };
};

export const quantityUnitGetData = (data) => {
  return (dispatch) => {
    dispatch(quantityUnitLoading());
    axios
      .get(baseUrl + "quantity-unit", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(quantityUnitSetData(res.data));
      })

      .catch((error) => dispatch(quantityUnitFailData(error)));
  };
};

export const deleteQuantityUnitFail = (error) => {
  return {
    type: actionType.DELETE_QUANTITY_UNIT_FAIL,
    error: error,
  };
};

export const deleteQuantityUnit = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `quantity-unit/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted QuantityUnit!").then(() => {
            dispatch(quantityUnitGetData(data));
          });
        })
        .catch((error) => dispatch(deleteQuantityUnitFail()));
    }
  };
};

export const postQuantityUnitDataStart = () => {
  return {
    type: actionType.POST_QUANTITY_UNIT_DATA_START,
  };
};

export const postQuantityUnitDataFail = (error) => {
  return {
    type: actionType.POST_QUANTITY_UNIT_DATA_FAIL,
    error: error,
  };
};

export const postQuantityUnitDataSuccess = (success) => {
  return {
    type: actionType.POST_QUANTITY_UNIT_DATA_SUCCESS,
    success: success,
  };
};

export const quantityUnitPostLoading = () => {
  return {
    type: actionType.QUANTITY_UNIT_POST_LOADING,
  };
};

export const postQuantityUnitData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postQuantityUnitDataStart());
    dispatch(quantityUnitPostLoading());
    axios
      .post(baseUrl + "quantity-unit", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postQuantityUnitDataSuccess(res.data));
        dispatch(quantityUnitGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created QuantityUnit",
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
        dispatch(postQuantityUnitDataFail(error));
      });
  };
};

export const updateQuantityUnitDataStart = () => {
  return {
    type: actionType.UPDATE_QUANTITY_UNIT_DATA_START,
  };
};

export const quantityUnitUpdateLoading = () => {
  return {
    type: actionType.QUANTITY_UNIT_UPDATE_LOADING,
  };
};

export const updateQuantityUnitDataFail = (error) => {
  return {
    type: actionType.UPDATE_QUANTITY_UNIT_DATA_FAIL,
    error: error,
  };
};

export const updateQuantityUnitDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_QUANTITY_UNIT_DATA_SUCCESS,
    success: success,
  };
};

export const updateQuantityUnitData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateQuantityUnitDataStart());
    dispatch(quantityUnitUpdateLoading());

    axios
      .put(baseUrl + `quantity-unit/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateQuantityUnitDataSuccess(res.data));
        dispatch(quantityUnitGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Quantity unit",
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
        dispatch(updateQuantityUnitDataFail(error));
      });
  };
};
