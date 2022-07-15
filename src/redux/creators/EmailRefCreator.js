import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const emailRefSetData = (emailRef) => {
  return {
    type: actionType.EMAIL_REF_SET_DATA,
    emailRef: emailRef,
  };
};

export const emailRefFailData = (error) => {
  return {
    type: actionType.EMAIL_REF_FAIL_DATA,
    error: error,
  };
};

export const emailRefLoading = () => {
  return {
    type: actionType.EMAIL_REF_LOADING,
  };
};

export const emailRefGetData = (data) => {
  return (dispatch) => {
    dispatch(emailRefLoading());
    axios
      .get(baseUrl + "email-refs", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(emailRefSetData(res.data));
      })

      .catch((error) => dispatch(emailRefFailData(error)));
  };
};

export const deleteEmailRefFail = (error) => {
  return {
    type: actionType.DELETE_EMAIL_REF_FAIL,
    error: error,
  };
};

export const deleteEmailRef = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `email-refs/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted EmailRef!").then(() => {
            dispatch(emailRefGetData(data));
          });
        })
        .catch((error) => dispatch(deleteEmailRefFail()));
    }
  };
};

export const postEmailRefDataStart = () => {
  return {
    type: actionType.POST_EMAIL_REF_DATA_START,
  };
};

export const postEmailRefDataFail = (error) => {
  return {
    type: actionType.POST_EMAIL_REF_DATA_FAIL,
    error: error,
  };
};

export const postEmailRefDataSuccess = (success) => {
  return {
    type: actionType.POST_EMAIL_REF_DATA_SUCCESS,
    success: success,
  };
};

export const emailRefPostLoading = () => {
  return {
    type: actionType.EMAIL_REF_POST_LOADING,
  };
};

export const postEmailRefData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postEmailRefDataStart());
    dispatch(emailRefPostLoading());
    axios
      .post(baseUrl + "email-refs", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postEmailRefDataSuccess(res.data));
        dispatch(emailRefGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created EmailRef",
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
        dispatch(postEmailRefDataFail(error));
      });
  };
};

export const updateEmailRefDataStart = () => {
  return {
    type: actionType.UPDATE_EMAIL_REF_DATA_START,
  };
};

export const emailRefUpdateLoading = () => {
  return {
    type: actionType.EMAIL_REF_UPDATE_LOADING,
  };
};

export const updateEmailRefDataFail = (error) => {
  return {
    type: actionType.UPDATE_EMAIL_REF_DATA_FAIL,
    error: error,
  };
};

export const updateEmailRefDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_EMAIL_REF_DATA_SUCCESS,
    success: success,
  };
};

export const updateEmailRefData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateEmailRefDataStart());
    dispatch(emailRefUpdateLoading());

    axios
      .put(baseUrl + `email-refs/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateEmailRefDataSuccess(res.data));
        dispatch(emailRefGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated EmailRef",
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
        dispatch(updateEmailRefDataFail(error));
      });
  };
};
