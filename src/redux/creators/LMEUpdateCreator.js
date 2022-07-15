import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const LMEUpdateSetData = (LMEUpdate) => {
  return {
    type: actionType.LME_UPDATE_SET_DATA,
    LMEUpdate: LMEUpdate,
  };
};

export const LMEUpdateFailData = (error) => {
  return {
    type: actionType.LME_UPDATE_FAIL_DATA,
    error: error,
  };
};

export const LMEUpdateLoading = () => {
  return {
    type: actionType.LME_UPDATE_LOADING,
  };
};

export const LMEUpdateGetData = (data) => {
  return (dispatch) => {
    dispatch(LMEUpdateLoading());
    axios
      .get(baseUrl + "lme", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(LMEUpdateSetData(res.data));
      })

      .catch((error) => dispatch(LMEUpdateFailData(error)));
  };
};

export const deleteLMEUpdateFail = (error) => {
  return {
    type: actionType.DELETE_LME_UPDATE_FAIL,
    error: error,
  };
};

export const deleteLMEUpdate = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `lme/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(LMEUpdateGetData(data));
            }
          );
        })
        .catch((error) => dispatch(deleteLMEUpdateFail()));
    }
  };
};

export const postLMEUpdateDataStart = () => {
  return {
    type: actionType.POST_LME_UPDATE_DATA_START,
  };
};

export const postLMEUpdateDataFail = (error) => {
  return {
    type: actionType.POST_LME_UPDATE_DATA_FAIL,
    error: error,
  };
};

export const postLMEUpdateDataSuccess = (success) => {
  return {
    type: actionType.POST_LME_UPDATE_DATA_SUCCESS,
    success: success,
  };
};

export const LMEUpdatePostLoading = () => {
  return {
    type: actionType.LME_UPDATE_POST_LOADING,
  };
};

export const postLMEUpdateData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postLMEUpdateDataStart());
    dispatch(LMEUpdatePostLoading());
    axios
      .post(baseUrl + "lme", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postLMEUpdateDataSuccess(res.data));
        dispatch(LMEUpdateGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created LMEUpdate",
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
        dispatch(postLMEUpdateDataFail(error));
      });
  };
};

export const updateLMEUpdateDataStart = () => {
  return {
    type: actionType.UPDATE_LME_UPDATE_DATA_START,
  };
};

export const LMEUpdateUpdateLoading = () => {
  return {
    type: actionType.LME_UPDATE_UPDATE_LOADING,
  };
};

export const updateLMEUpdateDataFail = (error) => {
  return {
    type: actionType.UPDATE_LME_UPDATE_DATA_FAIL,
    error: error,
  };
};

export const updateLMEUpdateDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_LME_UPDATE_DATA_SUCCESS,
    success: success,
  };
};

export const updateLMEUpdateData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateLMEUpdateDataStart());
    dispatch(LMEUpdateUpdateLoading());

    axios
      .put(baseUrl + `lme/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateLMEUpdateDataSuccess(res.data));
        dispatch(LMEUpdateGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated LMEUpdate",
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
        dispatch(updateLMEUpdateDataFail(error));
      });
  };
};
