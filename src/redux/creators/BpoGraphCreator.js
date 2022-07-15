import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const bpoGraphSetData = (bpoGraph) => {
  return {
    type: actionType.BPO_GRAPH_SET_DATA,
    bpoGraph: bpoGraph,
  };
};

export const bpoGraphFailData = (error) => {
  return {
    type: actionType.BPO_GRAPH_FAIL_DATA,
    error: error,
  };
};

export const bpoGraphLoading = () => {
  return {
    type: actionType.BPO_GRAPH_LOADING,
  };
};

export const bpoGraphGetData = (data) => {
  return (dispatch) => {
    dispatch(bpoGraphLoading());
    axios
      .get(baseUrl + "get-bpo-graph", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(bpoGraphSetData(res.data));
      })

      .catch((error) => dispatch(bpoGraphFailData(error)));
  };
};

export const deleteBpoGraphFail = (error) => {
  return {
    type: actionType.DELETE_BPO_GRAPH_FAIL,
    error: error,
  };
};

export const deleteBpoGraph = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `get-bpo-graph/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted BpoGraph!").then(() => {
            dispatch(bpoGraphGetData(data));
          });
        })
        .catch((error) => dispatch(deleteBpoGraphFail()));
    }
  };
};

export const postBpoGraphDataStart = () => {
  return {
    type: actionType.POST_BPO_GRAPH_DATA_START,
  };
};

export const postBpoGraphDataFail = (error) => {
  return {
    type: actionType.POST_BPO_GRAPH_DATA_FAIL,
    error: error,
  };
};

export const postBpoGraphDataSuccess = (success) => {
  return {
    type: actionType.POST_BPO_GRAPH_DATA_SUCCESS,
    success: success,
  };
};

export const bpoGraphPostLoading = () => {
  return {
    type: actionType.BPO_GRAPH_POST_LOADING,
  };
};

export const postBpoGraphData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postBpoGraphDataStart());
    dispatch(bpoGraphPostLoading());
    axios
      .post(baseUrl + "get-bpo-graph", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postBpoGraphDataSuccess(res.data));
        dispatch(bpoGraphGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created BpoGraph",
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
        dispatch(postBpoGraphDataFail(error));
      });
  };
};

export const updateBpoGraphDataStart = () => {
  return {
    type: actionType.UPDATE_BPO_GRAPH_DATA_START,
  };
};

export const bpoGraphUpdateLoading = () => {
  return {
    type: actionType.BPO_GRAPH_UPDATE_LOADING,
  };
};

export const updateBpoGraphDataFail = (error) => {
  return {
    type: actionType.UPDATE_BPO_GRAPH_DATA_FAIL,
    error: error,
  };
};

export const updateBpoGraphDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_BPO_GRAPH_DATA_SUCCESS,
    success: success,
  };
};

export const updateBpoGraphData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateBpoGraphDataStart());
    dispatch(bpoGraphUpdateLoading());

    axios
      .put(baseUrl + `get-bpo-graph/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateBpoGraphDataSuccess(res.data));
        dispatch(bpoGraphGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated BpoGraph",
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
        dispatch(updateBpoGraphDataFail(error));
      });
  };
};
