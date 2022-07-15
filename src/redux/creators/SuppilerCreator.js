import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const suppilerSetData = (suppiler) => {
  return {
    type: actionType.SUPPILER_SET_DATA,
    suppiler: suppiler,
  };
};

export const suppilerFailData = (error) => {
  return {
    type: actionType.SUPPILER_FAIL_DATA,
    error: error,
  };
};

export const suppilerLoading = () => {
  return {
    type: actionType.SUPPILER_LOADING,
  };
};

export const suppilerGetData = (data) => {
  return (dispatch) => {
    dispatch(suppilerLoading());
    axios
      .get(baseUrl + "clients", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(suppilerSetData(res.data));
      })

      .catch((error) => dispatch(suppilerFailData(error)));
  };
};

export const deleteSupplierFail = (error) => {
  return {
    type: actionType.DELETE_SUPPILER_FAIL,
    error: error,
  };
};

export const deleteSupplier = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `clients/${data.id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(suppilerGetData(data));
            }
          );
        })
        .catch((error) => dispatch(deleteSupplierFail()));
    }
  };
};

export const postSupplierDataStart = () => {
  return {
    type: actionType.POST_SUPPILER_DATA_START,
  };
};

export const postSupplierDataFail = (error) => {
  return {
    type: actionType.POST_SUPPILER_DATA_FAIL,
    error: error,
  };
};

export const postSupplierDataSuccess = (success) => {
  return {
    type: actionType.POST_SUPPILER_DATA_SUCCESS,
    success: success,
  };
};

export const suppilerPostLoading = () => {
  return {
    type: actionType.SUPPILER_POST_LOADING,
  };
};

export const postSupplierData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postSupplierDataStart());
    dispatch(suppilerPostLoading());
    axios
      .post(baseUrl + "clients", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postSupplierDataSuccess(res.data));
        dispatch(suppilerGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Client",
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
        dispatch(postSupplierDataFail(error));
      });
  };
};

export const updateSupplierDataStart = () => {
  return {
    type: actionType.UPDATE_SUPPILER_DATA_START,
  };
};

export const suppilerUpdateLoading = () => {
  return {
    type: actionType.SUPPILER_UPDATE_LOADING,
  };
};

export const updateSupplierDataFail = (error) => {
  return {
    type: actionType.UPDATE_SUPPILER_DATA_FAIL,
    error: error,
  };
};

export const updateSupplierDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_SUPPILER_DATA_SUCCESS,
    success: success,
  };
};

export const updateSupplierData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateSupplierDataStart());
    dispatch(suppilerUpdateLoading());

    axios
      .put(baseUrl + `clients/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateSupplierDataSuccess(res.data));
        dispatch(suppilerGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Client",
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
        dispatch(updateSupplierDataFail(error));
      });
  };
};
