import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const containerSizeSetData = (containerSize) => {
  return {
    type: actionType.CONTAINER_SIZE_SET_DATA,
    containerSize: containerSize,
  };
};

export const containerSizeFailData = (error) => {
  return {
    type: actionType.CONTAINER_SIZE_FAIL_DATA,
    error: error,
  };
};

export const containerSizeLoading = () => {
  return {
    type: actionType.CONTAINER_SIZE_LOADING,
  };
};

export const containerSizeGetData = (data) => {
  return (dispatch) => {
    dispatch(containerSizeLoading());
    axios
      .get(baseUrl + "containers", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(containerSizeSetData(res.data));
      })

      .catch((error) => dispatch(containerSizeFailData(error)));
  };
};

export const deleteContainerSizeFail = (error) => {
  return {
    type: actionType.DELETE_CONTAINER_SIZE_FAIL,
    error: error,
  };
};

export const deleteContainerSize = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `containers/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted ContainerSize!").then(() => {
            dispatch(containerSizeGetData(data));
          });
        })
        .catch((error) => dispatch(deleteContainerSizeFail()));
    }
  };
};

export const postContainerSizeDataStart = () => {
  return {
    type: actionType.POST_CONTAINER_SIZE_DATA_START,
  };
};

export const postContainerSizeDataFail = (error) => {
  return {
    type: actionType.POST_CONTAINER_SIZE_DATA_FAIL,
    error: error,
  };
};

export const postContainerSizeDataSuccess = (success) => {
  return {
    type: actionType.POST_CONTAINER_SIZE_DATA_SUCCESS,
    success: success,
  };
};

export const containerSizePostLoading = () => {
  return {
    type: actionType.CONTAINER_SIZE_POST_LOADING,
  };
};

export const postContainerSizeData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postContainerSizeDataStart());
    dispatch(containerSizePostLoading());
    axios
      .post(baseUrl + "containers", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postContainerSizeDataSuccess(res.data));
        dispatch(containerSizeGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created ContainerSize",
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
        dispatch(postContainerSizeDataFail(error));
      });
  };
};

export const updateContainerSizeDataStart = () => {
  return {
    type: actionType.UPDATE_CONTAINER_SIZE_DATA_START,
  };
};

export const containerSizeUpdateLoading = () => {
  return {
    type: actionType.CONTAINER_SIZE_UPDATE_LOADING,
  };
};

export const updateContainerSizeDataFail = (error) => {
  return {
    type: actionType.UPDATE_CONTAINER_SIZE_DATA_FAIL,
    error: error,
  };
};

export const updateContainerSizeDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_CONTAINER_SIZE_DATA_SUCCESS,
    success: success,
  };
};

export const updateContainerSizeData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateContainerSizeDataStart());
    dispatch(containerSizeUpdateLoading());

    axios
      .put(baseUrl + `containers/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateContainerSizeDataSuccess(res.data));
        dispatch(containerSizeGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Container Size",
          showConfirmButton: false,
          timer: 4000,
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
        dispatch(updateContainerSizeDataFail(error));
      });
  };
};
