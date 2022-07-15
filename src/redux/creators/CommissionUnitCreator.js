import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const commissionUnitSetData = (commissionUnit) => {
  return {
    type: actionType.COMMISSION_UNIT_SET_DATA,
    commissionUnit: commissionUnit,
  };
};

export const commissionUnitFailData = (error) => {
  return {
    type: actionType.COMMISSION_UNIT_FAIL_DATA,
    error: error,
  };
};

export const commissionUnitLoading = () => {
  return {
    type: actionType.COMMISSION_UNIT_LOADING,
  };
};

export const commissionUnitGetData = (data) => {
  return (dispatch) => {
    dispatch(commissionUnitLoading());
    axios
      .get(baseUrl + "commission-unit", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(commissionUnitSetData(res.data));
      })

      .catch((error) => dispatch(commissionUnitFailData(error)));
  };
};

export const deleteCommissionUnitFail = (error) => {
  return {
    type: actionType.DELETE_COMMISSION_UNIT_FAIL,
    error: error,
  };
};

export const deleteCommissionUnit = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `commission-unit/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Commission Unit!").then(() => {
            dispatch(commissionUnitGetData(data));
          });
        })
        .catch((error) => dispatch(deleteCommissionUnitFail()));
    }
  };
};

export const postCommissionUnitDataStart = () => {
  return {
    type: actionType.POST_COMMISSION_UNIT_DATA_START,
  };
};

export const postCommissionUnitDataFail = (error) => {
  return {
    type: actionType.POST_COMMISSION_UNIT_DATA_FAIL,
    error: error,
  };
};

export const postCommissionUnitDataSuccess = (success) => {
  return {
    type: actionType.POST_COMMISSION_UNIT_DATA_SUCCESS,
    success: success,
  };
};

export const commissionUnitPostLoading = () => {
  return {
    type: actionType.COMMISSION_UNIT_POST_LOADING,
  };
};

export const postCommissionUnitData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postCommissionUnitDataStart());
    dispatch(commissionUnitPostLoading());
    axios
      .post(baseUrl + "commission-unit", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postCommissionUnitDataSuccess(res.data));
        dispatch(commissionUnitGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Commission Unit",
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
        dispatch(postCommissionUnitDataFail(error));
      });
  };
};

export const updateCommissionUnitDataStart = () => {
  return {
    type: actionType.UPDATE_COMMISSION_UNIT_DATA_START,
  };
};

export const commissionUnitUpdateLoading = () => {
  return {
    type: actionType.COMMISSION_UNIT_UPDATE_LOADING,
  };
};

export const updateCommissionUnitDataFail = (error) => {
  return {
    type: actionType.UPDATE_COMMISSION_UNIT_DATA_FAIL,
    error: error,
  };
};

export const updateCommissionUnitDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_COMMISSION_UNIT_DATA_SUCCESS,
    success: success,
  };
};

export const updateCommissionUnitData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateCommissionUnitDataStart());
    dispatch(commissionUnitUpdateLoading());

    axios
      .put(baseUrl + `commission-unit/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateCommissionUnitDataSuccess(res.data));
        dispatch(commissionUnitGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Commission Unit",
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
        dispatch(updateCommissionUnitDataFail(error));
      });
  };
};
