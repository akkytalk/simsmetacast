import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const portDischargeSetData = (portDischarge) => {
  return {
    type: actionType.PORT_DISCHARGE_SET_DATA,
    portDischarge: portDischarge,
  };
};

export const portDischargeFailData = (error) => {
  return {
    type: actionType.PORT_DISCHARGE_FAIL_DATA,
    error: error,
  };
};

export const portDischargeLoading = () => {
  return {
    type: actionType.PORT_DISCHARGE_LOADING,
  };
};

export const portDischargeGetData = (data) => {
  return (dispatch) => {
    dispatch(portDischargeLoading());
    axios
      .get(baseUrl + "discharge-port", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(portDischargeSetData(res.data));
      })

      .catch((error) => dispatch(portDischargeFailData(error)));
  };
};

export const deletePortDischargeFail = (error) => {
  return {
    type: actionType.DELETE_PORT_DISCHARGE_FAIL,
    error: error,
  };
};

export const deletePortDischarge = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `discharge-port/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted PortDischarge!").then(() => {
            dispatch(portDischargeGetData(data));
          });
        })
        .catch((error) => dispatch(deletePortDischargeFail()));
    }
  };
};

export const postPortDischargeDataStart = () => {
  return {
    type: actionType.POST_PORT_DISCHARGE_DATA_START,
  };
};

export const postPortDischargeDataFail = (error) => {
  return {
    type: actionType.POST_PORT_DISCHARGE_DATA_FAIL,
    error: error,
  };
};

export const postPortDischargeDataSuccess = (success) => {
  return {
    type: actionType.POST_PORT_DISCHARGE_DATA_SUCCESS,
    success: success,
  };
};

export const portDischargePostLoading = () => {
  return {
    type: actionType.PORT_DISCHARGE_POST_LOADING,
  };
};

export const postPortDischargeData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postPortDischargeDataStart());
    dispatch(portDischargePostLoading());
    axios
      .post(baseUrl + "discharge-port", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postPortDischargeDataSuccess(res.data));
        dispatch(portDischargeGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created PortDischarge",
          showConfirmButton: true,
          // timer: 5000,
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
        dispatch(postPortDischargeDataFail(error));
      });
  };
};

export const updatePortDischargeDataStart = () => {
  return {
    type: actionType.UPDATE_PORT_DISCHARGE_DATA_START,
  };
};

export const portDischargeUpdateLoading = () => {
  return {
    type: actionType.PORT_DISCHARGE_UPDATE_LOADING,
  };
};

export const updatePortDischargeDataFail = (error) => {
  return {
    type: actionType.UPDATE_PORT_DISCHARGE_DATA_FAIL,
    error: error,
  };
};

export const updatePortDischargeDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_PORT_DISCHARGE_DATA_SUCCESS,
    success: success,
  };
};

export const updatePortDischargeData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updatePortDischargeDataStart());
    dispatch(portDischargeUpdateLoading());

    axios
      .put(baseUrl + `discharge-port/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updatePortDischargeDataSuccess(res.data));
        dispatch(portDischargeGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated port discharge",
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
        dispatch(updatePortDischargeDataFail(error));
      });
  };
};
