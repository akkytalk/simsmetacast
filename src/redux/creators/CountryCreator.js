import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const countrySetData = (country) => {
  return {
    type: actionType.COUNTRY_SET_DATA,
    country: country,
  };
};

export const countryFailData = (error) => {
  return {
    type: actionType.COUNTRY_FAIL_DATA,
    error: error,
  };
};

export const countryLoading = () => {
  return {
    type: actionType.COUNTRY_LOADING,
  };
};

export const countryGetData = (data) => {
  return (dispatch) => {
    dispatch(countryLoading());
    axios
      .get(baseUrl + "countries", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(countrySetData(res.data));
      })

      .catch((error) => dispatch(countryFailData(error)));
  };
};

export const deleteCountryFail = (error) => {
  return {
    type: actionType.DELETE_COUNTRY_FAIL,
    error: error,
  };
};

export const deleteCountry = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `countries/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted Country!").then(() => {
            dispatch(countryGetData(data));
          });
        })
        .catch((error) => dispatch(deleteCountryFail()));
    }
  };
};

export const postCountryDataStart = () => {
  return {
    type: actionType.POST_COUNTRY_DATA_START,
  };
};

export const postCountryDataFail = (error) => {
  return {
    type: actionType.POST_COUNTRY_DATA_FAIL,
    error: error,
  };
};

export const postCountryDataSuccess = (success) => {
  return {
    type: actionType.POST_COUNTRY_DATA_SUCCESS,
    success: success,
  };
};

export const countryPostLoading = () => {
  return {
    type: actionType.COUNTRY_POST_LOADING,
  };
};

export const postCountryData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postCountryDataStart());
    dispatch(countryPostLoading());
    axios
      .post(baseUrl + "countries", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postCountryDataSuccess(res.data));
        dispatch(countryGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created Country",
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
        dispatch(postCountryDataFail(error));
      });
  };
};

export const updateCountryDataStart = () => {
  return {
    type: actionType.UPDATE_COUNTRY_DATA_START,
  };
};

export const countryUpdateLoading = () => {
  return {
    type: actionType.COUNTRY_UPDATE_LOADING,
  };
};

export const updateCountryDataFail = (error) => {
  return {
    type: actionType.UPDATE_COUNTRY_DATA_FAIL,
    error: error,
  };
};

export const updateCountryDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_COUNTRY_DATA_SUCCESS,
    success: success,
  };
};

export const updateCountryData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateCountryDataStart());
    dispatch(countryUpdateLoading());

    axios
      .put(baseUrl + `countries/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateCountryDataSuccess(res.data));
        dispatch(countryGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated Country",
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
        dispatch(updateCountryDataFail(error));
      });
  };
};
