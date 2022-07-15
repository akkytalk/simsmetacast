import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const GBQGraphSetData = (GBQGraph) => {
  return {
    type: actionType.GBQ_GRAPH_SET_DATA,
    GBQGraph: GBQGraph,
  };
};

export const GBQGraphFailData = (error) => {
  return {
    type: actionType.GBQ_GRAPH_FAIL_DATA,
    error: error,
  };
};

export const GBQGraphLoading = () => {
  return {
    type: actionType.GBQ_GRAPH_LOADING,
  };
};

export const GBQGraphGetData = (data) => {
  return (dispatch) => {
    dispatch(GBQGraphLoading());
    axios
      .get(baseUrl + "get-booked-quantity-graph", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(GBQGraphSetData(res.data));
      })

      .catch((error) => dispatch(GBQGraphFailData(error)));
  };
};

export const GSQGraphSetData = (GSQGraph) => {
  return {
    type: actionType.GSQ_GRAPH_SET_DATA,
    GSQGraph: GSQGraph,
  };
};

export const GSQGraphFailData = (error) => {
  return {
    type: actionType.GSQ_GRAPH_FAIL_DATA,
    error: error,
  };
};

export const GSQGraphLoading = () => {
  return {
    type: actionType.GSQ_GRAPH_LOADING,
  };
};

export const GSQGraphGetData = (data) => {
  return (dispatch) => {
    dispatch(GSQGraphLoading());
    axios
      .get(baseUrl + "get-shipped-quantity-graph", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(GSQGraphSetData(res.data));
      })

      .catch((error) => dispatch(GSQGraphFailData(error)));
  };
};

export const deleteGBQGraphFail = (error) => {
  return {
    type: actionType.DELETE_GBQ_GRAPH_FAIL,
    error: error,
  };
};

export const deleteGBQGraph = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `get-booked-quantity-graph/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted GBQGraph!").then(() => {
            dispatch(GBQGraphGetData(data));
          });
        })
        .catch((error) => dispatch(deleteGBQGraphFail()));
    }
  };
};

export const postGBQGraphDataStart = () => {
  return {
    type: actionType.POST_GBQ_GRAPH_DATA_START,
  };
};

export const postGBQGraphDataFail = (error) => {
  return {
    type: actionType.POST_GBQ_GRAPH_DATA_FAIL,
    error: error,
  };
};

export const postGBQGraphDataSuccess = (success) => {
  return {
    type: actionType.POST_GBQ_GRAPH_DATA_SUCCESS,
    success: success,
  };
};

export const GBQGraphPostLoading = () => {
  return {
    type: actionType.GBQ_GRAPH_POST_LOADING,
  };
};

export const postGBQGraphData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postGBQGraphDataStart());
    dispatch(GBQGraphPostLoading());
    axios
      .post(baseUrl + "get-booked-quantity-graph", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postGBQGraphDataSuccess(res.data));
        dispatch(GBQGraphGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created GBQGraph",
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
        dispatch(postGBQGraphDataFail(error));
      });
  };
};

export const updateGBQGraphDataStart = () => {
  return {
    type: actionType.UPDATE_GBQ_GRAPH_DATA_START,
  };
};

export const GBQGraphUpdateLoading = () => {
  return {
    type: actionType.GBQ_GRAPH_UPDATE_LOADING,
  };
};

export const updateGBQGraphDataFail = (error) => {
  return {
    type: actionType.UPDATE_GBQ_GRAPH_DATA_FAIL,
    error: error,
  };
};

export const updateGBQGraphDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_GBQ_GRAPH_DATA_SUCCESS,
    success: success,
  };
};

export const updateGBQGraphData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateGBQGraphDataStart());
    dispatch(GBQGraphUpdateLoading());

    axios
      .put(baseUrl + `get-booked-quantity-graph/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateGBQGraphDataSuccess(res.data));
        dispatch(GBQGraphGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated GBQGraph",
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
        dispatch(updateGBQGraphDataFail(error));
      });
  };
};
