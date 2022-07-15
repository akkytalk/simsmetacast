import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";
import { purchaseSalesIndentGetData } from ".";

export const purchaseOrderSetData = (purchaseOrder) => {
  return {
    type: actionType.PURCHASE_ORDER_SET_DATA,
    purchaseOrder: purchaseOrder,
  };
};

export const purchaseOrderFailData = (error) => {
  return {
    type: actionType.PURCHASE_ORDER_FAIL_DATA,
    error: error,
  };
};

export const purchaseOrderLoading = () => {
  return {
    type: actionType.PURCHASE_ORDER_LOADING,
  };
};

export const purchaseOrderGetData = (data) => {
  return (dispatch) => {
    dispatch(purchaseOrderLoading());

    const cancelled = data?.cancelled ? { cancelled: true } : "";
    const newLocal = !cancelled
      ? axios
          .get(baseUrl + "bpo", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + data.token,
            },
          })
          .then((res) => {
            console.log(res.data, "res");
            dispatch(purchaseOrderSetData(res.data));
          })
          .catch((error) => dispatch(purchaseOrderFailData(error)))
      : axios
          .get(baseUrl + "bpo?cancelled=true", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + data.token,
            },
          })
          .then((res) => {
            console.log(res.data, "res");
            dispatch(purchaseOrderSetData(res.data));
          })
          .catch((error) => dispatch(purchaseOrderFailData(error)));
  };
};

export const deletePurchaseOrderFail = (error) => {
  return {
    type: actionType.DELETE_PURCHASE_ORDER_FAIL,
    error: error,
  };
};

export const deletePurchaseOrder = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `bpo/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(purchaseOrderGetData(data));
            }
          );
        })
        .catch((error) => dispatch(deletePurchaseOrderFail(error)));
    }
  };
};

export const postPurchaseOrderDataStart = () => {
  return {
    type: actionType.POST_PURCHASE_ORDER_DATA_START,
  };
};

export const postPurchaseOrderDataFail = (error) => {
  return {
    type: actionType.POST_PURCHASE_ORDER_DATA_FAIL,
    error: error,
  };
};

export const postPurchaseOrderDataSuccess = (success) => {
  return {
    type: actionType.POST_PURCHASE_ORDER_DATA_SUCCESS,
    success: success,
  };
};

export const purchaseOrderPostLoading = () => {
  return {
    type: actionType.PURCHASE_ORDER_POST_LOADING,
  };
};

export const postPurchaseOrderData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postPurchaseOrderDataStart());
    dispatch(purchaseOrderPostLoading());
    axios
      .post(baseUrl + "bpo", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postPurchaseOrderDataSuccess(res.data));
        dispatch(purchaseOrderGetData(data));
        dispatch(purchaseSalesIndentGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created PurchaseOrder",
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
        dispatch(postPurchaseOrderDataFail(error));
      });
  };
};

export const updatePurchaseOrderDataStart = () => {
  return {
    type: actionType.UPDATE_PURCHASE_ORDER_DATA_START,
  };
};

export const purchaseOrderUpdateLoading = () => {
  return {
    type: actionType.PURCHASE_ORDER_UPDATE_LOADING,
  };
};

export const updatePurchaseOrderDataFail = (error) => {
  return {
    type: actionType.UPDATE_PURCHASE_ORDER_DATA_FAIL,
    error: error,
  };
};

export const updatePurchaseOrderDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_PURCHASE_ORDER_DATA_SUCCESS,
    success: success,
  };
};

export const updatePurchaseOrderData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updatePurchaseOrderDataStart());
    dispatch(purchaseOrderUpdateLoading());

    axios
      .put(baseUrl + `bpo/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updatePurchaseOrderDataSuccess(res.data));
        dispatch(purchaseOrderGetData(data));
        dispatch(purchaseSalesIndentGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated PurchaseOrder",
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
        dispatch(updatePurchaseOrderDataFail(error));
      });
  };
};
