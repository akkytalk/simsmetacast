import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const userHistorySetData = (userHistory) => {
  return {
    type: actionType.USER_HISTORY_SET_DATA,
    userHistory: userHistory,
  };
};

export const userHistoryFailData = (error) => {
  return {
    type: actionType.USER_HISTORY_FAIL_DATA,
    error: error,
  };
};

export const userHistoryLoading = () => {
  return {
    type: actionType.USER_HISTORY_LOADING,
  };
};

export const userHistoryGetData = (data) => {
  return (dispatch) => {
    dispatch(userHistoryLoading());
    axios
      .get(baseUrl + "order-history", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(userHistorySetData(res.data));
      })

      .catch((error) => dispatch(userHistoryFailData(error)));
  };
};

export const deleteUserHistoryFail = (error) => {
  return {
    type: actionType.DELETE_USER_HISTORY_FAIL,
    error: error,
  };
};

export const deleteUserHistory = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `order-history/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted UserHistory!").then(() => {
            dispatch(userHistoryGetData(data));
          });
        })
        .catch((error) => dispatch(deleteUserHistoryFail()));
    }
  };
};

export const postUserHistoryDataStart = () => {
  return {
    type: actionType.POST_USER_HISTORY_DATA_START,
  };
};

export const postUserHistoryDataFail = (error) => {
  return {
    type: actionType.POST_USER_HISTORY_DATA_FAIL,
    error: error,
  };
};

export const postUserHistoryDataSuccess = (success) => {
  return {
    type: actionType.POST_USER_HISTORY_DATA_SUCCESS,
    success: success,
  };
};

export const userHistoryPostLoading = () => {
  return {
    type: actionType.USER_HISTORY_POST_LOADING,
  };
};

export const postUserHistoryData = (data, user) => {
  return (dispatch) => {
    dispatch(postUserHistoryDataStart());
    dispatch(userHistoryPostLoading());
    axios
      .post(baseUrl + `order-history?order_id=${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(userHistorySetData(res.data));

        // dispatch(postUserHistoryDataSuccess(res.data));
        // dispatch(userHistoryGetData(data));
        console.log(`done`, res.data);
        // Swal.fire({
        //   position: "success",
        //   icon: "success",
        //   title: "Successfully Created UserHistory",
        //   showConfirmButton: false,
        //   timer: 1500,
        // }).then(() => {});
      })
      .catch((error) => {
        dispatch(postUserHistoryDataFail(error));
      });
  };
};

export const updateUserHistoryDataStart = () => {
  return {
    type: actionType.UPDATE_USER_HISTORY_DATA_START,
  };
};

export const userHistoryUpdateLoading = () => {
  return {
    type: actionType.USER_HISTORY_UPDATE_LOADING,
  };
};

export const updateUserHistoryDataFail = (error) => {
  return {
    type: actionType.UPDATE_USER_HISTORY_DATA_FAIL,
    error: error,
  };
};

export const updateUserHistoryDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_USER_HISTORY_DATA_SUCCESS,
    success: success,
  };
};

export const updateUserHistoryData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateUserHistoryDataStart());
    dispatch(userHistoryUpdateLoading());

    axios
      .put(baseUrl + `order-history/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateUserHistoryDataSuccess(res.data));
        dispatch(userHistoryGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated UserHistory",
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
        dispatch(updateUserHistoryDataFail(error));
      });
  };
};
