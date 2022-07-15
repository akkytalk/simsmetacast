import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "shared/axios";
import Swal from "sweetalert2";

const quantityUnitSlice = createSlice({
  name: "quantityUnit",
  initialState: {
    postQuantityUnit: [],
    quantityUnit: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    quantityUnitSetData: (state, action) => {
      state.quantityUnit = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    quantityUnitFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    quantityUnitLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    quantityUnitPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    quantityUnitUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postQuantityUnitDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postQuantityUnitDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postQuantityUnit = action.payload;
    },
    updateQuantityUnitDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateQuantityUnitDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postQuantityUnit = action.payload;
    },
  },
});

export const {
  quantityUnitSetData,
  quantityUnitFailData,
  quantityUnitLoading,
  quantityUnitPostLoading,
  quantityUnitUpdateLoading,
  postQuantityUnitDataFail,
  postQuantityUnitDataSuccess,
  updateQuantityUnitDataFail,
  updateQuantityUnitDataSuccess,
} = quantityUnitSlice.actions;

export default quantityUnitSlice.reducer;

const url = "/quantity-unit";
const timeDifferenceInMinutes = 60 * 24;

export const quantityUnitGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.master.quantityUnit;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }
    dispatch(quantityUnitLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(quantityUnitSetData(response.data));
    } catch (error) {
      dispatch(quantityUnitFailData(error.message));
    }
  };

export const postQuantityUnitData =
  (data, quantityUnit, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(quantityUnitPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, quantityUnit, {
        headers: myheader,
      });
      dispatch(postQuantityUnitDataSuccess(response.data));
      dispatch(quantityUnitGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created QuantityUnit",
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
      dispatch(postQuantityUnitDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateQuantityUnitData =
  (data, quantityUnit, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(quantityUnitUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, quantityUnit, {
        headers: myheader,
      });

      dispatch(updateQuantityUnitDataSuccess(response.data));
      dispatch(quantityUnitGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated QuantityUnit",
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
      dispatch(updateQuantityUnitDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteQuantityUnit = (id, data) => async (dispatch) => {
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
      dispatch(quantityUnitGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
