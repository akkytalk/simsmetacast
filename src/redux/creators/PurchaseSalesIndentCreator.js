import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const purchaseSalesIndentSetData = (purchaseSalesIndent) => {
  return {
    type: actionType.PURCHASE_SALES_INDENT_SET_DATA,
    purchaseSalesIndent: purchaseSalesIndent,
  };
};

export const purchaseSalesIndentFailData = (error) => {
  return {
    type: actionType.PURCHASE_SALES_INDENT_FAIL_DATA,
    error: error,
  };
};

export const purchaseSalesIndentLoading = () => {
  return {
    type: actionType.PURCHASE_SALES_INDENT_LOADING,
  };
};

export const purchaseSalesIndentGetData = (data) => {
  return (dispatch) => {
    dispatch(purchaseSalesIndentLoading());
    axios
      .get(
        baseUrl +
          `${
            !data.cancelled
              ? "purchase-sale-indents"
              : "purchase-sale-indents?cancelled=true"
          } `,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data, "res");
        dispatch(purchaseSalesIndentSetData(res.data));
      })

      .catch((error) => dispatch(purchaseSalesIndentFailData(error)));
  };
};

export const deletePurchaseSalesIndentFail = (error) => {
  return {
    type: actionType.DELETE_PURCHASE_SALES_INDENT_FAIL,
    error: error,
  };
};

export const deletePurchaseSalesIndent = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `purchase-sale-indents/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(purchaseSalesIndentGetData(data));
            }
          );
        })

        .catch((error) => dispatch(deletePurchaseSalesIndentFail()));
    }
  };
};

export const postPurchaseSalesIndentDataStart = () => {
  return {
    type: actionType.POST_PURCHASE_SALES_INDENT_DATA_START,
  };
};

export const postPurchaseSalesIndentDataFail = (error) => {
  return {
    type: actionType.POST_PURCHASE_SALES_INDENT_DATA_FAIL,
    error: error,
  };
};

export const postPurchaseSalesIndentDataSuccess = (success) => {
  return {
    type: actionType.POST_PURCHASE_SALES_INDENT_DATA_SUCCESS,
    success: success,
  };
};

export const purchaseSalesIndentPostLoading = () => {
  return {
    type: actionType.PURCHASE_SALES_INDENT_POST_LOADING,
  };
};

export const postPurchaseSalesIndentData = (
  data,
  user,
  toggle,
  setSubmitting
) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postPurchaseSalesIndentDataStart());
    dispatch(purchaseSalesIndentPostLoading());
    axios
      .post(baseUrl + "purchase-sale-indents", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postPurchaseSalesIndentDataSuccess(res.data));
        dispatch(purchaseSalesIndentGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created PurchaseSalesIndent",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          if (setSubmitting) {
            setSubmitting(false);
          }
          if (toggle) {
            toggle();
          }
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(postPurchaseSalesIndentDataFail(error));
      });
  };
};

export const updatePurchaseSalesIndentDataStart = () => {
  return {
    type: actionType.UPDATE_PURCHASE_SALES_INDENT_DATA_START,
  };
};

export const purchaseSalesIndentUpdateLoading = () => {
  return {
    type: actionType.PURCHASE_SALES_INDENT_UPDATE_LOADING,
  };
};

export const updatePurchaseSalesIndentDataFail = (error) => {
  return {
    type: actionType.UPDATE_PURCHASE_SALES_INDENT_DATA_FAIL,
    error: error,
  };
};

export const updatePurchaseSalesIndentDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_PURCHASE_SALES_INDENT_DATA_SUCCESS,
    success: success,
  };
};

export const updatePurchaseSalesIndentData = (
  data,
  user,

  setSubmitting
) => {
  return (dispatch) => {
    dispatch(updatePurchaseSalesIndentDataStart());
    dispatch(purchaseSalesIndentUpdateLoading());

    axios
      .put(baseUrl + `purchase-sale-indents/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updatePurchaseSalesIndentDataSuccess(res.data));
        dispatch(purchaseSalesIndentGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated PurchaseSalesIndent",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          if (setSubmitting) {
            setSubmitting(false);
          }
        });
      })
      .catch((error) => {
        if (setSubmitting) {
          setSubmitting(false);
        }
        dispatch(updatePurchaseSalesIndentDataFail(error));
      });
  };
};
