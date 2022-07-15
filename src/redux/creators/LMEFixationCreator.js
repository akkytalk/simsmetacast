import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const lmeFixationSetData = (lmeFixation) => {
  return {
    type: actionType.LME_FIXATION_SET_DATA,
    lmeFixation: lmeFixation,
  };
};

export const lmeFixationFailData = (error) => {
  return {
    type: actionType.LME_FIXATION_FAIL_DATA,
    error: error,
  };
};

export const lmeFixationLoading = () => {
  return {
    type: actionType.LME_FIXATION_LOADING,
  };
};

export const lmeFixationGetData = (data) => {
  return (dispatch) => {
    dispatch(lmeFixationLoading());
    axios
      .get(baseUrl + "get-lme", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(lmeFixationSetData(res.data));
      })

      .catch((error) => dispatch(lmeFixationFailData(error)));
  };
};

export const deleteLmeFixationFail = (error) => {
  return {
    type: actionType.DELETE_LME_FIXATION_FAIL,
    error: error,
  };
};

export const deleteLmeFixation = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `get-lme/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted LmeFixation!").then(() => {
            dispatch(lmeFixationGetData(data));
          });
        })
        .catch((error) => dispatch(deleteLmeFixationFail()));
    }
  };
};

export const postLmeFixationDataStart = () => {
  return {
    type: actionType.POST_LME_FIXATION_DATA_START,
  };
};

export const postLmeFixationDataFail = (error) => {
  return {
    type: actionType.POST_LME_FIXATION_DATA_FAIL,
    error: error,
  };
};

export const postLmeFixationDataSuccess = (success) => {
  return {
    type: actionType.POST_LME_FIXATION_DATA_SUCCESS,
    success: success,
  };
};

export const lmeFixationPostLoading = () => {
  return {
    type: actionType.LME_FIXATION_POST_LOADING,
  };
};

export const postLmeFixationData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postLmeFixationDataStart());
    dispatch(lmeFixationPostLoading());
    axios
      .post(baseUrl + "get-lme", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postLmeFixationDataSuccess(res.data));
        dispatch(lmeFixationGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created LmeFixation",
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
        dispatch(postLmeFixationDataFail(error));
      });
  };
};

export const updateLmeFixationDataStart = () => {
  return {
    type: actionType.UPDATE_LME_FIXATION_DATA_START,
  };
};

export const lmeFixationUpdateLoading = () => {
  return {
    type: actionType.LME_FIXATION_UPDATE_LOADING,
  };
};

export const updateLmeFixationDataFail = (error) => {
  return {
    type: actionType.UPDATE_LME_FIXATION_DATA_FAIL,
    error: error,
  };
};

export const updateLmeFixationDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_LME_FIXATION_DATA_SUCCESS,
    success: success,
  };
};

export const updateLmeFixationData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateLmeFixationDataStart());
    dispatch(lmeFixationUpdateLoading());

    axios
      .put(baseUrl + `get-lme/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateLmeFixationDataSuccess(res.data));
        dispatch(lmeFixationGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated LmeFixation",
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
        dispatch(updateLmeFixationDataFail(error));
      });
  };
};
