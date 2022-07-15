import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const weightUnitSetData = (weightUnit) => {
  return {
    type: actionType.WEIGHT_UNIT_SET_DATA,
    weightUnit: weightUnit,
  };
};

export const weightUnitFailData = (error) => {
  return {
    type: actionType.WEIGHT_UNIT_FAIL_DATA,
    error: error,
  };
};

export const weightUnitLoading = () => {
  return {
    type: actionType.WEIGHT_UNIT_LOADING,
  };
};

export const weightUnitGetData = (data) => {
  return (dispatch) => {
    dispatch(weightUnitLoading());
    axios
      .get(baseUrl + "weight-unit", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(weightUnitSetData(res.data));
      })

      .catch((error) => dispatch(weightUnitFailData(error)));
  };
};

export const deleteWeightUnitFail = (error) => {
  return {
    type: actionType.DELETE_WEIGHT_UNIT_FAIL,
    error: error,
  };
};

export const deleteWeightUnit = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `weight-unit/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Weight Unit!").then(() => {
            dispatch(weightUnitGetData(data));
          });
        })
        .catch((error) => dispatch(deleteWeightUnitFail()));
    }
  };
};

export const postWeightUnitDataStart = () => {
  return {
    type: actionType.POST_WEIGHT_UNIT_DATA_START,
  };
};

export const postWeightUnitDataFail = (error) => {
  return {
    type: actionType.POST_WEIGHT_UNIT_DATA_FAIL,
    error: error,
  };
};

export const postWeightUnitDataSuccess = (success) => {
  return {
    type: actionType.POST_WEIGHT_UNIT_DATA_SUCCESS,
    success: success,
  };
};

export const weightUnitPostLoading = () => {
  return {
    type: actionType.WEIGHT_UNIT_POST_LOADING,
  };
};

export const postWeightUnitData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postWeightUnitDataStart());
    dispatch(weightUnitPostLoading());
    axios
      .post(baseUrl + "weight-unit", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postWeightUnitDataSuccess(res.data));
        dispatch(weightUnitGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Weight Unit",
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
        dispatch(postWeightUnitDataFail(error));
      });
  };
};

export const updateWeightUnitDataStart = () => {
  return {
    type: actionType.UPDATE_WEIGHT_UNIT_DATA_START,
  };
};

export const weightUnitUpdateLoading = () => {
  return {
    type: actionType.WEIGHT_UNIT_UPDATE_LOADING,
  };
};

export const updateWeightUnitDataFail = (error) => {
  return {
    type: actionType.UPDATE_WEIGHT_UNIT_DATA_FAIL,
    error: error,
  };
};

export const updateWeightUnitDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_WEIGHT_UNIT_DATA_SUCCESS,
    success: success,
  };
};

export const updateWeightUnitData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateWeightUnitDataStart());
    dispatch(weightUnitUpdateLoading());

    axios
      .put(baseUrl + `weight-unit/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateWeightUnitDataSuccess(res.data));
        dispatch(weightUnitGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Weight Unit",
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
        dispatch(updateWeightUnitDataFail(error));
      });
  };
};
