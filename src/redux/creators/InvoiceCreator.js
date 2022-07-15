import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";
import { purchaseOrderGetData, purchaseSalesIndentGetData } from ".";

export const invoiceSetData = (invoice) => {
  return {
    type: actionType.INVOICE_SET_DATA,
    invoice: invoice,
  };
};

export const invoiceFailData = (error) => {
  return {
    type: actionType.INVOICE_FAIL_DATA,
    error: error,
  };
};

export const invoiceLoading = () => {
  return {
    type: actionType.INVOICE_LOADING,
  };
};

export const invoiceGetData = (data) => {
  return (dispatch) => {
    dispatch(invoiceLoading());
    axios
      .get(baseUrl + "invoices", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(invoiceSetData(res.data));
      })

      .catch((error) => dispatch(invoiceFailData(error)));
  };
};

export const deleteInvoiceFail = (error) => {
  return {
    type: actionType.DELETE_INVOICE_FAIL,
    error: error,
  };
};

export const deleteInvoice = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `invoices/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(invoiceGetData(data));
            }
          );
        })

        .catch((error) => dispatch(deleteInvoiceFail()));
    }
  };
};

export const postInvoiceDataStart = () => {
  return {
    type: actionType.POST_INVOICE_DATA_START,
  };
};

export const postInvoiceDataFail = (error) => {
  return {
    type: actionType.POST_INVOICE_DATA_FAIL,
    error: error,
  };
};

export const postInvoiceDataSuccess = (success) => {
  return {
    type: actionType.POST_INVOICE_DATA_SUCCESS,
    success: success,
  };
};

export const invoicePostLoading = () => {
  return {
    type: actionType.INVOICE_POST_LOADING,
  };
};

export const postInvoiceData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postInvoiceDataStart());
    dispatch(invoicePostLoading());
    axios
      .post(baseUrl + "invoices", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postInvoiceDataSuccess(res.data));
        dispatch(invoiceGetData(data));
        dispatch(purchaseOrderGetData(data));
        dispatch(purchaseSalesIndentGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Invoice",
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
        dispatch(postInvoiceDataFail(error));
      });
  };
};

export const updateInvoiceDataStart = () => {
  return {
    type: actionType.UPDATE_INVOICE_DATA_START,
  };
};

export const invoiceUpdateLoading = () => {
  return {
    type: actionType.INVOICE_UPDATE_LOADING,
  };
};

export const updateInvoiceDataFail = (error) => {
  return {
    type: actionType.UPDATE_INVOICE_DATA_FAIL,
    error: error,
  };
};

export const updateInvoiceDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_INVOICE_DATA_SUCCESS,
    success: success,
  };
};

export const updateInvoiceData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateInvoiceDataStart());
    dispatch(invoiceUpdateLoading());

    axios
      .put(baseUrl + `invoices/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateInvoiceDataSuccess(res.data));
        dispatch(invoiceGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Invoice",
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
        dispatch(updateInvoiceDataFail(error));
      });
  };
};
