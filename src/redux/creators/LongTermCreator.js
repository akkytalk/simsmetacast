import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const longTermSetData = (longTerm) => {
  return {
    type: actionType.LONG_TERM_SET_DATA,
    longTerm: longTerm,
  };
};

export const longTermFailData = (error) => {
  return {
    type: actionType.LONG_TERM_FAIL_DATA,
    error: error,
  };
};

export const longTermLoading = () => {
  return {
    type: actionType.LONG_TERM_LOADING,
  };
};

export const longTermGetData = (data) => {
  return (dispatch) => {
    dispatch(longTermLoading());
    axios
      .get(baseUrl + "long-term", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(longTermSetData(res.data));
      })

      .catch((error) => dispatch(longTermFailData(error)));
  };
};

export const deleteLongTermFail = (error) => {
  return {
    type: actionType.DELETE_LONG_TERM_FAIL,
    error: error,
  };
};

export const deleteLongTerm = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `long-term/${id}`, {
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
              dispatch(longTermGetData(data));
            }
          );
        })
        .catch((error) => dispatch(deleteLongTermFail(error)));
    }
  };
};

export const postLongTermDataStart = () => {
  return {
    type: actionType.POST_LONG_TERM_DATA_START,
  };
};

export const postLongTermDataFail = (error) => {
  return {
    type: actionType.POST_LONG_TERM_DATA_FAIL,
    error: error,
  };
};

export const postLongTermDataSuccess = (success) => {
  return {
    type: actionType.POST_LONG_TERM_DATA_SUCCESS,
    success: success,
  };
};

export const longTermPostLoading = () => {
  return {
    type: actionType.LONG_TERM_POST_LOADING,
  };
};

export const postLongTermData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postLongTermDataStart());
    dispatch(longTermPostLoading());
    axios
      .post(baseUrl + "long-term", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postLongTermDataSuccess(res.data));
        dispatch(longTermGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created LongTerm",
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
        dispatch(postLongTermDataFail(error));
      });
  };
};

export const updateLongTermDataStart = () => {
  return {
    type: actionType.UPDATE_LONG_TERM_DATA_START,
  };
};

export const longTermUpdateLoading = () => {
  return {
    type: actionType.LONG_TERM_UPDATE_LOADING,
  };
};

export const updateLongTermDataFail = (error) => {
  return {
    type: actionType.UPDATE_LONG_TERM_DATA_FAIL,
    error: error,
  };
};

export const updateLongTermDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_LONG_TERM_DATA_SUCCESS,
    success: success,
  };
};

export const updateLongTermData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateLongTermDataStart());
    dispatch(longTermUpdateLoading());

    axios
      .put(baseUrl + `long-term/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateLongTermDataSuccess(res.data));
        dispatch(longTermGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated LongTerm",
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
        dispatch(updateLongTermDataFail(error));
      });
  };
};
