import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const fileUploadSetData = (fileUpload) => {
  return {
    type: actionType.FILE_UPLOAD_SET_DATA,
    fileUpload: fileUpload,
  };
};

export const fileUploadFailData = (error) => {
  return {
    type: actionType.FILE_UPLOAD_FAIL_DATA,
    error: error,
  };
};

export const fileUploadLoading = () => {
  return {
    type: actionType.FILE_UPLOAD_LOADING,
  };
};

export const fileUploadGetData = (data) => {
  return (dispatch) => {
    dispatch(fileUploadLoading());
    axios
      .get(baseUrl + "file-uploads", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(fileUploadSetData(res.data));
      })

      .catch((error) => dispatch(fileUploadFailData(error)));
  };
};

export const deleteFileUploadFail = (error) => {
  return {
    type: actionType.DELETE_FILE_UPLOAD_FAIL,
    error: error,
  };
};

export const deleteFileUpload = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `file-uploads/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted FileUpload!").then(() => {
            dispatch(fileUploadGetData(data));
          });
        })
        .catch((error) => dispatch(deleteFileUploadFail()));
    }
  };
};

export const postFileUploadDataStart = () => {
  return {
    type: actionType.POST_FILE_UPLOAD_DATA_START,
  };
};

export const postFileUploadDataFail = (error) => {
  return {
    type: actionType.POST_FILE_UPLOAD_DATA_FAIL,
    error: error,
  };
};

export const postFileUploadDataSuccess = (success) => {
  return {
    type: actionType.POST_FILE_UPLOAD_DATA_SUCCESS,
    success: success,
  };
};

export const fileUploadPostLoading = () => {
  return {
    type: actionType.FILE_UPLOAD_POST_LOADING,
  };
};

export const postFileUploadData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postFileUploadDataStart());
    dispatch(fileUploadPostLoading());
    axios
      .post(baseUrl + "file-uploads", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postFileUploadDataSuccess(res.data));
        dispatch(fileUploadGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created FileUpload",
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
        dispatch(postFileUploadDataFail(error));
      });
  };
};

export const updateFileUploadDataStart = () => {
  return {
    type: actionType.UPDATE_FILE_UPLOAD_DATA_START,
  };
};

export const fileUploadUpdateLoading = () => {
  return {
    type: actionType.FILE_UPLOAD_UPDATE_LOADING,
  };
};

export const updateFileUploadDataFail = (error) => {
  return {
    type: actionType.UPDATE_FILE_UPLOAD_DATA_FAIL,
    error: error,
  };
};

export const updateFileUploadDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_FILE_UPLOAD_DATA_SUCCESS,
    success: success,
  };
};

export const updateFileUploadData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateFileUploadDataStart());
    dispatch(fileUploadUpdateLoading());

    axios
      .post(baseUrl + `file-uploads/${data.id}?_method=PUT`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateFileUploadDataSuccess(res.data));
        dispatch(fileUploadGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated FileUpload",
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
        dispatch(updateFileUploadDataFail(error));
      });
  };
};
