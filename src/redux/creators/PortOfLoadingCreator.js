import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const portLoadingSetData = (portLoading) => {
  return {
    type: actionType.PORT_LOADING_SET_DATA,
    portLoading: portLoading,
  };
};

export const portLoadingFailData = (error) => {
  return {
    type: actionType.PORT_LOADING_FAIL_DATA,
    error: error,
  };
};

export const portLoadingLoading = () => {
  return {
    type: actionType.PORT_LOADING_LOADING,
  };
};

export const portLoadingGetData = (data) => {
  return (dispatch) => {
    dispatch(portLoadingLoading());
    axios
      .get(baseUrl + "loading-port", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(portLoadingSetData(res.data));
      })

      .catch((error) => dispatch(portLoadingFailData(error)));
  };
};

export const deletePortLoadingFail = (error) => {
  return {
    type: actionType.DELETE_PORT_LOADING_FAIL,
    error: error,
  };
};

export const deletePortLoading = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `loading-port/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted PortLoading!").then(() => {
            dispatch(portLoadingGetData(data));
          });
        })
        .catch((error) => dispatch(deletePortLoadingFail()));
    }
  };
};

export const postPortLoadingDataStart = () => {
  return {
    type: actionType.POST_PORT_LOADING_DATA_START,
  };
};

export const postPortLoadingDataFail = (error) => {
  return {
    type: actionType.POST_PORT_LOADING_DATA_FAIL,
    error: error,
  };
};

export const postPortLoadingDataSuccess = (success) => {
  return {
    type: actionType.POST_PORT_LOADING_DATA_SUCCESS,
    success: success,
  };
};

export const portLoadingPostLoading = () => {
  return {
    type: actionType.PORT_LOADING_POST_LOADING,
  };
};

export const postPortLoadingData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postPortLoadingDataStart());
    dispatch(portLoadingPostLoading());
    axios
      .post(baseUrl + "loading-port", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postPortLoadingDataSuccess(res.data));
        dispatch(portLoadingGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created PortLoading",
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
        dispatch(postPortLoadingDataFail(error));
      });
  };
};

export const updatePortLoadingDataStart = () => {
  return {
    type: actionType.UPDATE_PORT_LOADING_DATA_START,
  };
};

export const portLoadingUpdateLoading = () => {
  return {
    type: actionType.PORT_LOADING_UPDATE_LOADING,
  };
};

export const updatePortLoadingDataFail = (error) => {
  return {
    type: actionType.UPDATE_PORT_LOADING_DATA_FAIL,
    error: error,
  };
};

export const updatePortLoadingDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_PORT_LOADING_DATA_SUCCESS,
    success: success,
  };
};

export const updatePortLoadingData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updatePortLoadingDataStart());
    dispatch(portLoadingUpdateLoading());

    axios
      .put(baseUrl + `loading-port/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updatePortLoadingDataSuccess(res.data));
        dispatch(portLoadingGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated port loading",
          showConfirmButton: false,
          timer: 5000,
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
        dispatch(updatePortLoadingDataFail(error));
      });
  };
};
