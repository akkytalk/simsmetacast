import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const usersSetData = (users) => {
  return {
    type: actionType.USERS_SET_DATA,
    users: users,
  };
};

export const usersFailData = (error) => {
  return {
    type: actionType.USERS_FAIL_DATA,
    error: error,
  };
};

export const usersLoading = () => {
  return {
    type: actionType.USERS_LOADING,
  };
};

export const usersGetData = (data) => {
  return (dispatch) => {
    dispatch(usersLoading());
    axios
      .get(baseUrl + "users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(usersSetData(res.data));
      })

      .catch((error) => dispatch(usersFailData(error)));
  };
};

export const deleteUsersFail = (error) => {
  return {
    type: actionType.DELETE_USERS_FAIL,
    error: error,
  };
};

export const deleteUsers = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `users/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(usersGetData(data));
            }
          );
        })

        .catch((error) => dispatch(deleteUsersFail()));
    }
  };
};

export const postUsersDataStart = () => {
  return {
    type: actionType.POST_USERS_DATA_START,
  };
};

export const postUsersDataFail = (error) => {
  return {
    type: actionType.POST_USERS_DATA_FAIL,
    error: error,
  };
};

export const postUsersDataSuccess = (success) => {
  return {
    type: actionType.POST_USERS_DATA_SUCCESS,
    success: success,
  };
};

export const usersPostLoading = () => {
  return {
    type: actionType.USERS_POST_LOADING,
  };
};

export const postUsersData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postUsersDataStart());
    dispatch(usersPostLoading());
    axios
      .post(baseUrl + "users", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postUsersDataSuccess(res.data));
        dispatch(usersGetData(data));

        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Users",
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
        dispatch(postUsersDataFail(error));
      });
  };
};

export const updateUsersDataStart = () => {
  return {
    type: actionType.UPDATE_USERS_DATA_START,
  };
};

export const usersUpdateLoading = () => {
  return {
    type: actionType.USERS_UPDATE_LOADING,
  };
};

export const updateUsersDataFail = (error) => {
  return {
    type: actionType.UPDATE_USERS_DATA_FAIL,
    error: error,
  };
};

export const updateUsersDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_USERS_DATA_SUCCESS,
    success: success,
  };
};

export const updateUsersData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateUsersDataStart());
    dispatch(usersUpdateLoading());

    axios
      .put(baseUrl + `users/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateUsersDataSuccess(res.data));
        dispatch(usersGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Users",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          if (setSubmitting) {
            setSubmitting(false);
          }
          if (toggle) {
            toggle();
          }
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(updateUsersDataFail(error));
      });
  };
};
