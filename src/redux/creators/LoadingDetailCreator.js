import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";
import { purchaseOrderGetData, purchaseSalesIndentGetData } from ".";

export const loadingDetailSetData = (loadingDetail) => {
  return {
    type: actionType.LOADING_DETAIL_SET_DATA,
    loadingDetail: loadingDetail,
  };
};

export const loadingDetailFailData = (error) => {
  return {
    type: actionType.LOADING_DETAIL_FAIL_DATA,
    error: error,
  };
};

export const loadingDetailLoading = () => {
  return {
    type: actionType.LOADING_DETAIL_LOADING,
  };
};

export const loadingDetailGetData = (data) => {
  return (dispatch) => {
    dispatch(loadingDetailLoading());
    axios
      .get(baseUrl + "loading-details", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(loadingDetailSetData(res.data));
      })

      .catch((error) => dispatch(loadingDetailFailData(error)));
  };
};

export const deleteLoadingDetailFail = (error) => {
  return {
    type: actionType.DELETE_LOADING_DETAIL_FAIL,
    error: error,
  };
};

export const deleteLoadingDetail = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `loading-details/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(loadingDetailGetData(data));
            }
          );
        })

        .catch((error) => dispatch(deleteLoadingDetailFail()));
    }
  };
};

export const postLoadingDetailDataStart = () => {
  return {
    type: actionType.POST_LOADING_DETAIL_DATA_START,
  };
};

export const postLoadingDetailDataFail = (error) => {
  return {
    type: actionType.POST_LOADING_DETAIL_DATA_FAIL,
    error: error,
  };
};

export const postLoadingDetailDataSuccess = (success) => {
  return {
    type: actionType.POST_LOADING_DETAIL_DATA_SUCCESS,
    success: success,
  };
};

export const loadingDetailPostLoading = () => {
  return {
    type: actionType.LOADING_DETAIL_POST_LOADING,
  };
};

export const postLoadingDetailData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postLoadingDetailDataStart());
    dispatch(loadingDetailPostLoading());
    axios
      .post(baseUrl + "loading-details", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postLoadingDetailDataSuccess(res.data));
        dispatch(purchaseOrderGetData(data));
        dispatch(purchaseSalesIndentGetData(data));
        // dispatch(loadingDetailSetData(res.data));
        dispatch(loadingDetailGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created LoadingDetail",
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
        dispatch(postLoadingDetailDataFail(error));
      });
  };
};

export const updateLoadingDetailDataStart = () => {
  return {
    type: actionType.UPDATE_LOADING_DETAIL_DATA_START,
  };
};

export const loadingDetailUpdateLoading = () => {
  return {
    type: actionType.LOADING_DETAIL_UPDATE_LOADING,
  };
};

export const updateLoadingDetailDataFail = (error) => {
  return {
    type: actionType.UPDATE_LOADING_DETAIL_DATA_FAIL,
    error: error,
  };
};

export const updateLoadingDetailDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_LOADING_DETAIL_DATA_SUCCESS,
    success: success,
  };
};

export const updateLoadingDetailData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateLoadingDetailDataStart());
    dispatch(loadingDetailUpdateLoading());

    axios
      .put(baseUrl + `loading-details/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateLoadingDetailDataSuccess(res.data));
        dispatch(loadingDetailGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated LoadingDetail",
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
        dispatch(updateLoadingDetailDataFail(error));
      });
  };
};
