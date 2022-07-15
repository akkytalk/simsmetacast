import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";
import { purchaseOrderGetData, purchaseSalesIndentGetData } from ".";

export const claimsSetData = (claims) => {
  return {
    type: actionType.CLAIMS_SET_DATA,
    claims: claims,
  };
};

export const claimsFailData = (error) => {
  return {
    type: actionType.CLAIMS_FAIL_DATA,
    error: error,
  };
};

export const claimsLoading = () => {
  return {
    type: actionType.CLAIMS_LOADING,
  };
};

export const claimsGetData = (data) => {
  return (dispatch) => {
    dispatch(claimsLoading());
    axios
      .get(baseUrl + "claims", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(claimsSetData(res.data));
      })

      .catch((error) => dispatch(claimsFailData(error)));
  };
};

export const deleteClaimsFail = (error) => {
  return {
    type: actionType.DELETE_CLAIMS_FAIL,
    error: error,
  };
};

export const deleteClaims = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `claims/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(claimsGetData(data));
            }
          );
        })

        .catch((error) => dispatch(deleteClaimsFail()));
    }
  };
};

export const postClaimsDataStart = () => {
  return {
    type: actionType.POST_CLAIMS_DATA_START,
  };
};

export const postClaimsDataFail = (error) => {
  return {
    type: actionType.POST_CLAIMS_DATA_FAIL,
    error: error,
  };
};

export const postClaimsDataSuccess = (success) => {
  return {
    type: actionType.POST_CLAIMS_DATA_SUCCESS,
    success: success,
  };
};

export const claimsPostLoading = () => {
  return {
    type: actionType.CLAIMS_POST_LOADING,
  };
};

export const postClaimsData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postClaimsDataStart());
    dispatch(claimsPostLoading());
    axios
      .post(baseUrl + "claims", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postClaimsDataSuccess(res.data));
        dispatch(claimsGetData(data));
        dispatch(purchaseOrderGetData(data));
        dispatch(purchaseSalesIndentGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Claims",
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
        dispatch(postClaimsDataFail(error));
      });
  };
};

export const updateClaimsDataStart = () => {
  return {
    type: actionType.UPDATE_CLAIMS_DATA_START,
  };
};

export const claimsUpdateLoading = () => {
  return {
    type: actionType.CLAIMS_UPDATE_LOADING,
  };
};

export const updateClaimsDataFail = (error) => {
  return {
    type: actionType.UPDATE_CLAIMS_DATA_FAIL,
    error: error,
  };
};

export const updateClaimsDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_CLAIMS_DATA_SUCCESS,
    success: success,
  };
};

export const updateClaimsData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateClaimsDataStart());
    dispatch(claimsUpdateLoading());

    axios
      .put(baseUrl + `claims/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateClaimsDataSuccess(res.data));
        dispatch(claimsGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Claims",
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
        dispatch(updateClaimsDataFail(error));
      });
  };
};
