import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const countSetData = (count) => {
  return {
    type: actionType.COUNT_SET_DATA,
    count: count,
  };
};

export const countFailData = (error) => {
  return {
    type: actionType.COUNT_FAIL_DATA,
    error: error,
  };
};

export const countLoading = () => {
  return {
    type: actionType.COUNT_LOADING,
  };
};

export const countGetData = (data) => {
  return (dispatch) => {
    dispatch(countLoading());
    axios
      .get(baseUrl + "get-counts", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(countSetData(res.data));
      })

      .catch((error) => dispatch(countFailData(error)));
  };
};

export const deleteCountFail = (error) => {
  return {
    type: actionType.DELETE_COUNT_FAIL,
    error: error,
  };
};

export const deleteCount = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `get-counts/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Count!").then(() => {
            dispatch(countGetData(data));
          });
        })
        .catch((error) => dispatch(deleteCountFail()));
    }
  };
};

export const postCountDataStart = () => {
  return {
    type: actionType.POST_COUNT_DATA_START,
  };
};

export const postCountDataFail = (error) => {
  return {
    type: actionType.POST_COUNT_DATA_FAIL,
    error: error,
  };
};

export const postCountDataSuccess = (success) => {
  return {
    type: actionType.POST_COUNT_DATA_SUCCESS,
    success: success,
  };
};

export const countPostLoading = () => {
  return {
    type: actionType.COUNT_POST_LOADING,
  };
};

export const postCountData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postCountDataStart());
    dispatch(countPostLoading());
    axios
      .post(baseUrl + "get-counts", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postCountDataSuccess(res.data));
        dispatch(countGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Count",
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
        dispatch(postCountDataFail(error));
      });
  };
};

export const updateCountDataStart = () => {
  return {
    type: actionType.UPDATE_COUNT_DATA_START,
  };
};

export const countUpdateLoading = () => {
  return {
    type: actionType.COUNT_UPDATE_LOADING,
  };
};

export const updateCountDataFail = (error) => {
  return {
    type: actionType.UPDATE_COUNT_DATA_FAIL,
    error: error,
  };
};

export const updateCountDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_COUNT_DATA_SUCCESS,
    success: success,
  };
};

export const updateCountData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateCountDataStart());
    dispatch(countUpdateLoading());

    axios
      .put(baseUrl + `get-counts/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateCountDataSuccess(res.data));
        dispatch(countGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Count",
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
        dispatch(updateCountDataFail(error));
      });
  };
};
