import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const priceUnitSetData = (priceUnit) => {
  return {
    type: actionType.PRICE_UNIT_SET_DATA,
    priceUnit: priceUnit,
  };
};

export const priceUnitFailData = (error) => {
  return {
    type: actionType.PRICE_UNIT_FAIL_DATA,
    error: error,
  };
};

export const priceUnitLoading = () => {
  return {
    type: actionType.PRICE_UNIT_LOADING,
  };
};

export const priceUnitGetData = (data) => {
  return (dispatch) => {
    dispatch(priceUnitLoading());
    axios
      .get(baseUrl + "price-unit", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(priceUnitSetData(res.data));
      })

      .catch((error) => dispatch(priceUnitFailData(error)));
  };
};

export const deletePriceUnitFail = (error) => {
  return {
    type: actionType.DELETE_PRICE_UNIT_FAIL,
    error: error,
  };
};

export const deletePriceUnit = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `price-unit/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(priceUnitGetData(data));
            }
          );
        })
        .catch((error) => dispatch(deletePriceUnitFail()));
    }
  };
};

export const postPriceUnitDataStart = () => {
  return {
    type: actionType.POST_PRICE_UNIT_DATA_START,
  };
};

export const postPriceUnitDataFail = (error) => {
  return {
    type: actionType.POST_PRICE_UNIT_DATA_FAIL,
    error: error,
  };
};

export const postPriceUnitDataSuccess = (success) => {
  return {
    type: actionType.POST_PRICE_UNIT_DATA_SUCCESS,
    success: success,
  };
};

export const priceUnitPostLoading = () => {
  return {
    type: actionType.PRICE_UNIT_POST_LOADING,
  };
};

export const postPriceUnitData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postPriceUnitDataStart());
    dispatch(priceUnitPostLoading());
    axios
      .post(baseUrl + "price-unit", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postPriceUnitDataSuccess(res.data));
        dispatch(priceUnitGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Price Unit",
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
        dispatch(postPriceUnitDataFail(error));
      });
  };
};

export const updatePriceUnitDataStart = () => {
  return {
    type: actionType.UPDATE_PRICE_UNIT_DATA_START,
  };
};

export const priceUnitUpdateLoading = () => {
  return {
    type: actionType.PRICE_UNIT_UPDATE_LOADING,
  };
};

export const updatePriceUnitDataFail = (error) => {
  return {
    type: actionType.UPDATE_PRICE_UNIT_DATA_FAIL,
    error: error,
  };
};

export const updatePriceUnitDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_PRICE_UNIT_DATA_SUCCESS,
    success: success,
  };
};

export const updatePriceUnitData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updatePriceUnitDataStart());
    dispatch(priceUnitUpdateLoading());

    axios
      .put(baseUrl + `price-unit/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updatePriceUnitDataSuccess(res.data));
        dispatch(priceUnitGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Price Unit",
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
        dispatch(updatePriceUnitDataFail(error));
      });
  };
};
