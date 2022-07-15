import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const commoditySetData = (commodity) => {
  return {
    type: actionType.COMMODITY_SET_DATA,
    commodity: commodity,
  };
};

export const commodityFailData = (error) => {
  return {
    type: actionType.COMMODITY_FAIL_DATA,
    error: error,
  };
};

export const commodityLoading = () => {
  return {
    type: actionType.COMMODITY_LOADING,
  };
};

export const commodityGetData = (data) => {
  return (dispatch) => {
    dispatch(commodityLoading());
    axios
      .get(baseUrl + "commodities", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(commoditySetData(res.data));
      })

      .catch((error) => dispatch(commodityFailData(error)));
  };
};

export const deleteCommodityFail = (error) => {
  return {
    type: actionType.DELETE_COMMODITY_FAIL,
    error: error,
  };
};

export const deleteCommodity = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `commodities/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Commodity!").then(() => {
            dispatch(commodityGetData(data));
          });
        })
        .catch((error) => dispatch(deleteCommodityFail()));
    }
  };
};

export const postCommodityDataStart = () => {
  return {
    type: actionType.POST_COMMODITY_DATA_START,
  };
};

export const postCommodityDataFail = (error) => {
  return {
    type: actionType.POST_COMMODITY_DATA_FAIL,
    error: error,
  };
};

export const postCommodityDataSuccess = (success) => {
  return {
    type: actionType.POST_COMMODITY_DATA_SUCCESS,
    success: success,
  };
};

export const commodityPostLoading = () => {
  return {
    type: actionType.COMMODITY_POST_LOADING,
  };
};

export const postCommodityData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postCommodityDataStart());
    dispatch(commodityPostLoading());
    axios
      .post(baseUrl + "commodities", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postCommodityDataSuccess(res.data));
        dispatch(commodityGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Commodity",
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
        dispatch(postCommodityDataFail(error));
      });
  };
};

export const updateCommodityDataStart = () => {
  return {
    type: actionType.UPDATE_COMMODITY_DATA_START,
  };
};

export const commodityUpdateLoading = () => {
  return {
    type: actionType.COMMODITY_UPDATE_LOADING,
  };
};

export const updateCommodityDataFail = (error) => {
  return {
    type: actionType.UPDATE_COMMODITY_DATA_FAIL,
    error: error,
  };
};

export const updateCommodityDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_COMMODITY_DATA_SUCCESS,
    success: success,
  };
};

export const updateCommodityData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateCommodityDataStart());
    dispatch(commodityUpdateLoading());

    axios
      .put(baseUrl + `commodities/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateCommodityDataSuccess(res.data));
        dispatch(commodityGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Commodity",
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
        dispatch(updateCommodityDataFail(error));
      });
  };
};
