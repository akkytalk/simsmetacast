import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const commodityAnalysisSetData = (commodityAnalysis) => {
  return {
    type: actionType.COMMODITY_ANALYSIS_SET_DATA,
    commodityAnalysis: commodityAnalysis,
  };
};

export const commodityAnalysisFailData = (error) => {
  return {
    type: actionType.COMMODITY_ANALYSIS_FAIL_DATA,
    error: error,
  };
};

export const commodityAnalysisLoading = () => {
  return {
    type: actionType.COMMODITY_ANALYSIS_LOADING,
  };
};

export const commodityAnalysisGetData = (data) => {
  return (dispatch) => {
    dispatch(commodityAnalysisLoading());
    axios
      .get(baseUrl + "commodity-analysis", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(commodityAnalysisSetData(res.data));
      })

      .catch((error) => dispatch(commodityAnalysisFailData(error)));
  };
};

export const deleteCommodityAnalysisFail = (error) => {
  return {
    type: actionType.DELETE_COMMODITY_ANALYSIS_FAIL,
    error: error,
  };
};

export const deleteCommodityAnalysis = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `commodity-analysis/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Commodity Analysis!").then(() => {
            dispatch(commodityAnalysisGetData(data));
          });
        })
        .catch((error) => dispatch(deleteCommodityAnalysisFail()));
    }
  };
};

export const postCommodityAnalysisDataStart = () => {
  return {
    type: actionType.POST_COMMODITY_ANALYSIS_DATA_START,
  };
};

export const postCommodityAnalysisDataFail = (error) => {
  return {
    type: actionType.POST_COMMODITY_ANALYSIS_DATA_FAIL,
    error: error,
  };
};

export const postCommodityAnalysisDataSuccess = (success) => {
  return {
    type: actionType.POST_COMMODITY_ANALYSIS_DATA_SUCCESS,
    success: success,
  };
};

export const commodityAnalysisPostLoading = () => {
  return {
    type: actionType.COMMODITY_ANALYSIS_POST_LOADING,
  };
};

export const postCommodityAnalysisData = (
  data,
  user,
  toggle,
  setSubmitting
) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postCommodityAnalysisDataStart());
    dispatch(commodityAnalysisPostLoading());
    axios
      .post(baseUrl + "commodity-analysis", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postCommodityAnalysisDataSuccess(res.data));
        dispatch(commodityAnalysisGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Commodity Analysis",
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
        dispatch(postCommodityAnalysisDataFail(error));
      });
  };
};

export const updateCommodityAnalysisDataStart = () => {
  return {
    type: actionType.UPDATE_COMMODITY_ANALYSIS_DATA_START,
  };
};

export const commodityAnalysisUpdateLoading = () => {
  return {
    type: actionType.COMMODITY_ANALYSIS_UPDATE_LOADING,
  };
};

export const updateCommodityAnalysisDataFail = (error) => {
  return {
    type: actionType.UPDATE_COMMODITY_ANALYSIS_DATA_FAIL,
    error: error,
  };
};

export const updateCommodityAnalysisDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_COMMODITY_ANALYSIS_DATA_SUCCESS,
    success: success,
  };
};

export const updateCommodityAnalysisData = (
  data,
  user,
  toggle,
  setSubmitting
) => {
  return (dispatch) => {
    dispatch(updateCommodityAnalysisDataStart());
    dispatch(commodityAnalysisUpdateLoading());

    axios
      .put(baseUrl + `commodity-analysis/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateCommodityAnalysisDataSuccess(res.data));
        dispatch(commodityAnalysisGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Commodity Analysis",
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
        dispatch(updateCommodityAnalysisDataFail(error));
      });
  };
};
