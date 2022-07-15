import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";
import moment from "moment";

const citySlice = createSlice({
  name: "city",
  initialState: {
    postCity: [],
    city: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    citySetData: (city, action) => {
      city.city = action.payload;
      city.lastFetch = Date.now();
      city.error = false;
      city.isLoading = false;
      city.isPostLoading = false;
      city.isUpdateLoading = false;
    },
    cityFailData: (city, action) => {
      city.error = action.payload;
      city.isLoading = false;
      city.isPostLoading = false;
      city.isUpdateLoading = false;
    },
    cityLoading: (city, action) => {
      city.isLoading = true;
      city.error = false;
    },
    cityPostLoading: (city, action) => {
      city.isPostLoading = true;
      city.error = false;
    },
    cityUpdateLoading: (city, action) => {
      city.isUpdateLoading = true;
      city.error = false;
    },
    postCityDataFail: (city, action) => {
      city.error = action.payload;
      city.isPostLoading = false;
    },
    postCityDataSuccess: (city, action) => {
      city.isPostLoading = false;
      city.error = false;
      city.postCity = action.payload;
    },
    updateCityDataFail: (city, action) => {
      city.error = action.payload;
      city.isPostLoading = false;
      city.isUpdateLoading = false;
    },
    updateCityDataSuccess: (city, action) => {
      city.isUpdateLoading = false;
      city.error = false;
      city.postCity = action.payload;
    },
  },
});

export const {
  citySetData,
  cityFailData,
  cityLoading,
  cityPostLoading,
  cityUpdateLoading,
  postCityDataFail,
  postCityDataSuccess,
  updateCityDataFail,
  updateCityDataSuccess,
} = citySlice.actions;

export default citySlice.reducer;

const url = "/cities";
const timeDifferenceInMinutes = 1440 * 10;

export const cityGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    // implement caching
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities.address.country;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }
    dispatch(cityLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(citySetData(response.data));
    } catch (error) {
      dispatch(cityFailData(error.message));
    }
  };

export const postCityData =
  (data, city, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(cityPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, city, {
        headers: myheader,
      });
      dispatch(postCityDataSuccess(response.data));
      dispatch(cityGetData(data, updateLastFetch));

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
    } catch (error) {
      dispatch(postCityDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateCityData =
  (data, city, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(cityUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, city, {
        headers: myheader,
      });

      dispatch(updateCityDataSuccess(response.data));
      dispatch(cityGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated City",
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
    } catch (error) {
      dispatch(updateCityDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteCity = (id, data) => async (dispatch) => {
  let updateLastFetch = true;
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.delete(url + `/${id}`, {
      headers: myheader,
    });
    Swal.fire("Deleted!", "Your file has been deleted.", "success").then(() => {
      dispatch(cityGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
