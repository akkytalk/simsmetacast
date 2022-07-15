import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const metricTonSetData = (metricTon) => {
  return {
    type: actionType.METRIC_TON_SET_DATA,
    metricTon: metricTon,
  };
};

export const metricTonFailData = (error) => {
  return {
    type: actionType.METRIC_TON_FAIL_DATA,
    error: error,
  };
};

export const metricTonLoading = () => {
  return {
    type: actionType.METRIC_TON_LOADING,
  };
};

export const metricTonGetData = (data) => {
  return (dispatch) => {
    dispatch(metricTonLoading());
    axios
      .get(baseUrl + "get-metric-ton", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(metricTonSetData(res.data));
      })

      .catch((error) => dispatch(metricTonFailData(error)));
  };
};

export const deleteMetricTonFail = (error) => {
  return {
    type: actionType.DELETE_METRIC_TON_FAIL,
    error: error,
  };
};

export const deleteMetricTon = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `get-metric-ton/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted MetricTon!").then(() => {
            dispatch(metricTonGetData(data));
          });
        })
        .catch((error) => dispatch(deleteMetricTonFail()));
    }
  };
};

export const postMetricTonDataStart = () => {
  return {
    type: actionType.POST_METRIC_TON_DATA_START,
  };
};

export const postMetricTonDataFail = (error) => {
  return {
    type: actionType.POST_METRIC_TON_DATA_FAIL,
    error: error,
  };
};

export const postMetricTonDataSuccess = (success) => {
  return {
    type: actionType.POST_METRIC_TON_DATA_SUCCESS,
    success: success,
  };
};

export const metricTonPostLoading = () => {
  return {
    type: actionType.METRIC_TON_POST_LOADING,
  };
};

export const postMetricTonData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postMetricTonDataStart());
    dispatch(metricTonPostLoading());
    axios
      .post(baseUrl + "get-metric-ton", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postMetricTonDataSuccess(res.data));
        dispatch(metricTonGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created MetricTon",
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
        dispatch(postMetricTonDataFail(error));
      });
  };
};

export const updateMetricTonDataStart = () => {
  return {
    type: actionType.UPDATE_METRIC_TON_DATA_START,
  };
};

export const metricTonUpdateLoading = () => {
  return {
    type: actionType.METRIC_TON_UPDATE_LOADING,
  };
};

export const updateMetricTonDataFail = (error) => {
  return {
    type: actionType.UPDATE_METRIC_TON_DATA_FAIL,
    error: error,
  };
};

export const updateMetricTonDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_METRIC_TON_DATA_SUCCESS,
    success: success,
  };
};

export const updateMetricTonData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateMetricTonDataStart());
    dispatch(metricTonUpdateLoading());

    axios
      .put(baseUrl + `get-metric-ton/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateMetricTonDataSuccess(res.data));
        dispatch(metricTonGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated MetricTon",
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
        dispatch(updateMetricTonDataFail(error));
      });
  };
};
