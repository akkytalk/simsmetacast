import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const stateSetData = (state) => {
  return {
    type: actionType.STATE_SET_DATA,
    state: state,
  };
};

export const stateFailData = (error) => {
  return {
    type: actionType.STATE_FAIL_DATA,
    error: error,
  };
};

export const stateLoading = () => {
  return {
    type: actionType.STATE_LOADING,
  };
};

export const stateGetData = (data) => {
  return (dispatch) => {
    dispatch(stateLoading());
    axios
      .get(baseUrl + "states", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(stateSetData(res.data));
      })

      .catch((error) => dispatch(stateFailData(error)));
  };
};

export const deleteStateFail = (error) => {
  return {
    type: actionType.DELETE_STATE_FAIL,
    error: error,
  };
};

export const deleteState = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `states/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted State!").then(() => {
            dispatch(stateGetData(data));
          });
        })
        .catch((error) => dispatch(deleteStateFail()));
    }
  };
};

export const postStateDataStart = () => {
  return {
    type: actionType.POST_STATE_DATA_START,
  };
};

export const postStateDataFail = (error) => {
  return {
    type: actionType.POST_STATE_DATA_FAIL,
    error: error,
  };
};

export const postStateDataSuccess = (success) => {
  return {
    type: actionType.POST_STATE_DATA_SUCCESS,
    success: success,
  };
};

export const statePostLoading = () => {
  return {
    type: actionType.STATE_POST_LOADING,
  };
};

export const postStateData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postStateDataStart());
    dispatch(statePostLoading());
    axios
      .post(baseUrl + "states", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postStateDataSuccess(res.data));
        dispatch(stateGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created State",
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
        dispatch(postStateDataFail(error));
      });
  };
};

export const updateStateDataStart = () => {
  return {
    type: actionType.UPDATE_STATE_DATA_START,
  };
};

export const stateUpdateLoading = () => {
  return {
    type: actionType.STATE_UPDATE_LOADING,
  };
};

export const updateStateDataFail = (error) => {
  return {
    type: actionType.UPDATE_STATE_DATA_FAIL,
    error: error,
  };
};

export const updateStateDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_STATE_DATA_SUCCESS,
    success: success,
  };
};

export const updateStateData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateStateDataStart());
    dispatch(stateUpdateLoading());

    axios
      .put(baseUrl + `states/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateStateDataSuccess(res.data));
        dispatch(stateGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated State",
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
        dispatch(updateStateDataFail(error));
      });
  };
};
