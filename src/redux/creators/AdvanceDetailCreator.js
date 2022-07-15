import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";
import { purchaseOrderGetData, purchaseSalesIndentGetData } from ".";

export const advanceDetailSetData = (advanceDetail) => {
  return {
    type: actionType.ADVANCE_DETAIL_SET_DATA,
    advanceDetail: advanceDetail,
  };
};

export const advanceDetailFailData = (error) => {
  return {
    type: actionType.ADVANCE_DETAIL_FAIL_DATA,
    error: error,
  };
};

export const advanceDetailLoading = () => {
  return {
    type: actionType.ADVANCE_DETAIL_LOADING,
  };
};

export const advanceDetailGetData = (data) => {
  return (dispatch) => {
    dispatch(advanceDetailLoading());
    axios
      .get(baseUrl + "advance-details", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(advanceDetailSetData(res.data));
      })

      .catch((error) => dispatch(advanceDetailFailData(error)));
  };
};

export const deleteAdvanceDetailFail = (error) => {
  return {
    type: actionType.DELETE_ADVANCE_DETAIL_FAIL,
    error: error,
  };
};

export const deleteAdvanceDetail = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `advance-details/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted AdvanceDetail!").then(() => {
            dispatch(advanceDetailGetData(data));
          });
        })
        .catch((error) => dispatch(deleteAdvanceDetailFail()));
    }
  };
};

export const postAdvanceDetailDataStart = () => {
  return {
    type: actionType.POST_ADVANCE_DETAIL_DATA_START,
  };
};

export const postAdvanceDetailDataFail = (error) => {
  return {
    type: actionType.POST_ADVANCE_DETAIL_DATA_FAIL,
    error: error,
  };
};

export const postAdvanceDetailDataSuccess = (success) => {
  return {
    type: actionType.POST_ADVANCE_DETAIL_DATA_SUCCESS,
    success: success,
  };
};

export const advanceDetailPostLoading = () => {
  return {
    type: actionType.ADVANCE_DETAIL_POST_LOADING,
  };
};

export const postAdvanceDetailData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postAdvanceDetailDataStart());
    dispatch(advanceDetailPostLoading());
    axios
      .post(baseUrl + `advance-details/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postAdvanceDetailDataSuccess(res.data));
        dispatch(purchaseOrderGetData(data));
        dispatch(purchaseSalesIndentGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created AdvanceDetail",
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
        dispatch(postAdvanceDetailDataFail(error));
      });
  };
};

export const updateAdvanceDetailDataStart = () => {
  return {
    type: actionType.UPDATE_ADVANCE_DETAIL_DATA_START,
  };
};

export const advanceDetailUpdateLoading = () => {
  return {
    type: actionType.ADVANCE_DETAIL_UPDATE_LOADING,
  };
};

export const updateAdvanceDetailDataFail = (error) => {
  return {
    type: actionType.UPDATE_ADVANCE_DETAIL_DATA_FAIL,
    error: error,
  };
};

export const updateAdvanceDetailDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_ADVANCE_DETAIL_DATA_SUCCESS,
    success: success,
  };
};

export const updateAdvanceDetailData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateAdvanceDetailDataStart());
    dispatch(advanceDetailUpdateLoading());

    axios
      .put(baseUrl + `advance-details/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateAdvanceDetailDataSuccess(res.data));
        dispatch(advanceDetailGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated AdvanceDetail",
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
        dispatch(updateAdvanceDetailDataFail(error));
      });
  };
};
