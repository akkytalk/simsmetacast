import * as actionType from "../types/ActionTypes";
import axios from "../../shared/axios";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import { baseUrl } from "../../shared/baseURL";

export const citySetData = (city) => {
  return {
    type: actionType.CITY_SET_DATA,
    city: city,
  };
};

export const cityFailData = (error) => {
  return {
    type: actionType.CITY_FAIL_DATA,
    error: error,
  };
};

export const cityLoading = () => {
  return {
    type: actionType.CITY_LOADING,
  };
};

export const cityGetData = (data) => {
  return (dispatch) => {
    dispatch(cityLoading());
    axios
      .get(baseUrl + "cities", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        console.log(res.data, "res");
        dispatch(citySetData(res.data));
      })

      .catch((error) => dispatch(cityFailData(error)));
  };
};

export const deleteCityFail = (error) => {
  return {
    type: actionType.DELETE_CITY_FAIL,
    error: error,
  };
};

export const deleteCity = (id, data) => {
  return (dispatch) => {
    if (id) {
      axios
        .delete(baseUrl + `cities/${id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.token,
          },
        })
        .then(() => {
          console.log("swal");
          swal("Successfully Deleted City!").then(() => {
            dispatch(cityGetData(data));
          });
        })
        .catch((error) => dispatch(deleteCityFail()));
    }
  };
};

export const postCityDataStart = () => {
  return {
    type: actionType.POST_CITY_DATA_START,
  };
};

export const postCityDataFail = (error) => {
  return {
    type: actionType.POST_CITY_DATA_FAIL,
    error: error,
  };
};

export const postCityDataSuccess = (success) => {
  return {
    type: actionType.POST_CITY_DATA_SUCCESS,
    success: success,
  };
};

export const cityPostLoading = () => {
  return {
    type: actionType.CITY_POST_LOADING,
  };
};

export const postCityData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    console.log("user", user);
    dispatch(postCityDataStart());
    dispatch(cityPostLoading());
    axios
      .post(baseUrl + "cities", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(postCityDataSuccess(res.data));
        dispatch(cityGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Created City",
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
        dispatch(postCityDataFail(error));
      });
  };
};

export const updateCityDataStart = () => {
  return {
    type: actionType.UPDATE_CITY_DATA_START,
  };
};

export const cityUpdateLoading = () => {
  return {
    type: actionType.CITY_UPDATE_LOADING,
  };
};

export const updateCityDataFail = (error) => {
  return {
    type: actionType.UPDATE_CITY_DATA_FAIL,
    error: error,
  };
};

export const updateCityDataSuccess = (success) => {
  return {
    type: actionType.UPDATE_CITY_DATA_SUCCESS,
    success: success,
  };
};

export const updateCityData = (data, user, toggle, setSubmitting) => {
  return (dispatch) => {
    dispatch(updateCityDataStart());
    dispatch(cityUpdateLoading());

    axios
      .put(baseUrl + `cities/${data.id}`, user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.token,
        },
      })
      .then((res) => {
        dispatch(updateCityDataSuccess(res.data));
        dispatch(cityGetData(data));
        Swal.fire({
          position: "success",
          icon: "success",
          title: "Successfully Updated City",
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
        dispatch(updateCityDataFail(error));
      });
  };
};
