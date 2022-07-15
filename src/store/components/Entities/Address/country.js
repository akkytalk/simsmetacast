import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";
import moment from "moment";

const countrySlice = createSlice({
  name: "country",
  initialState: {
    postCountry: [],
    country: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    countrySetData: (country, action) => {
      country.country = action.payload;
      country.lastFetch = Date.now();
      country.error = false;
      country.isLoading = false;
      country.isPostLoading = false;
      country.isUpdateLoading = false;
    },
    countryFailData: (country, action) => {
      country.error = action.payload;
      country.isLoading = false;
      country.isPostLoading = false;
      country.isUpdateLoading = false;
    },
    countryLoading: (country, action) => {
      country.isLoading = true;
      country.error = false;
    },
    countryPostLoading: (country, action) => {
      country.isPostLoading = true;
      country.error = false;
    },
    countryUpdateLoading: (country, action) => {
      country.isUpdateLoading = true;
      country.error = false;
    },
    postCountryDataFail: (country, action) => {
      country.error = action.payload;
      country.isPostLoading = false;
    },
    postCountryDataSuccess: (country, action) => {
      country.isPostLoading = false;
      country.error = false;
      country.postCountry = action.payload;
    },
    updateCountryDataFail: (country, action) => {
      country.error = action.payload;
      country.isPostLoading = false;
      country.isUpdateLoading = false;
    },
    updateCountryDataSuccess: (country, action) => {
      country.isUpdateLoading = false;
      country.error = false;
      country.postCountry = action.payload;
    },
  },
});

export const {
  countrySetData,
  countryFailData,
  countryLoading,
  countryPostLoading,
  countryUpdateLoading,
  postCountryDataFail,
  postCountryDataSuccess,
  updateCountryDataFail,
  updateCountryDataSuccess,
} = countrySlice.actions;

export default countrySlice.reducer;

const url = "/countries";
const timeDifferenceInMinutes = 1440 * 10;

export const countryGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    // implement caching

    if (!updateLastFetch) {
      const { lastFetch } = getState().entities.address.country;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }
    dispatch(countryLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(countrySetData(response.data));
    } catch (error) {
      dispatch(countryFailData(error.message));
    }
  };

export const postCountryData =
  (data, country, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(countryPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, country, {
        headers: myheader,
      });
      dispatch(postCountryDataSuccess(response.data));
      dispatch(countryGetData(data, updateLastFetch));

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
    } catch (error) {
      dispatch(postCountryDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateCountryData =
  (data, country, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(countryUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, country, {
        headers: myheader,
      });

      dispatch(updateCountryDataSuccess(response.data));
      dispatch(countryGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated Country",
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
      dispatch(updateCountryDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteCountry = (id, data) => async (dispatch) => {
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
      dispatch(countryGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
