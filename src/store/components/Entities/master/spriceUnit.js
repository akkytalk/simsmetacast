import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "shared/axios";
import Swal from "sweetalert2";

const priceUnitSlice = createSlice({
  name: "priceUnit",
  initialState: {
    postPriceUnit: [],
    priceUnit: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    priceUnitSetData: (state, action) => {
      state.priceUnit = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    priceUnitFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    priceUnitLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    priceUnitPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    priceUnitUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postPriceUnitDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postPriceUnitDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postPriceUnit = action.payload;
    },
    updatePriceUnitDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updatePriceUnitDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postPriceUnit = action.payload;
    },
  },
});

export const {
  priceUnitSetData,
  priceUnitFailData,
  priceUnitLoading,
  priceUnitPostLoading,
  priceUnitUpdateLoading,
  postPriceUnitDataFail,
  postPriceUnitDataSuccess,
  updatePriceUnitDataFail,
  updatePriceUnitDataSuccess,
} = priceUnitSlice.actions;

export default priceUnitSlice.reducer;

const url = "/price-unit";
const timeDifferenceInMinutes = 60 * 24;

export const priceUnitGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.master.priceUnit;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }

    dispatch(priceUnitLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(priceUnitSetData(response.data));
    } catch (error) {
      dispatch(priceUnitFailData(error.message));
    }
  };

export const postPriceUnitData =
  (data, priceUnit, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(priceUnitPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, priceUnit, {
        headers: myheader,
      });
      dispatch(postPriceUnitDataSuccess(response.data));
      dispatch(priceUnitGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created PriceUnit",
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
      dispatch(postPriceUnitDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updatePriceUnitData =
  (data, priceUnit, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(priceUnitUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, priceUnit, {
        headers: myheader,
      });

      dispatch(updatePriceUnitDataSuccess(response.data));
      dispatch(priceUnitGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated PriceUnit",
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
      dispatch(updatePriceUnitDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deletePriceUnit = (id, data) => async (dispatch) => {
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
      dispatch(priceUnitGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
