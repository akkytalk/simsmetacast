import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "shared/axios";
import Swal from "sweetalert2";

const commissionUnitSlice = createSlice({
  name: "commissionUnit",
  initialState: {
    postCommissionUnit: [],
    commissionUnit: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    commissionUnitSetData: (state, action) => {
      state.commissionUnit = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    commissionUnitFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    commissionUnitLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    commissionUnitPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    commissionUnitUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postCommissionUnitDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postCommissionUnitDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postCommissionUnit = action.payload;
    },
    updateCommissionUnitDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateCommissionUnitDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postCommissionUnit = action.payload;
    },
  },
});

export const {
  commissionUnitSetData,
  commissionUnitFailData,
  commissionUnitLoading,
  commissionUnitPostLoading,
  commissionUnitUpdateLoading,
  postCommissionUnitDataFail,
  postCommissionUnitDataSuccess,
  updateCommissionUnitDataFail,
  updateCommissionUnitDataSuccess,
} = commissionUnitSlice.actions;

export default commissionUnitSlice.reducer;

const url = "/commission-unit";
const timeDifferenceInMinutes = 60 * 24;

export const commissionUnitGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.master.quantityUnit;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }
    dispatch(commissionUnitLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(commissionUnitSetData(response.data));
    } catch (error) {
      dispatch(commissionUnitFailData(error.message));
    }
  };

export const postCommissionUnitData =
  (data, commissionUnit, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(commissionUnitPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, commissionUnit, {
        headers: myheader,
      });
      dispatch(postCommissionUnitDataSuccess(response.data));
      dispatch(commissionUnitGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created CommissionUnit",
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
      dispatch(postCommissionUnitDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateCommissionUnitData =
  (data, commissionUnit, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(commissionUnitUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, commissionUnit, {
        headers: myheader,
      });

      dispatch(updateCommissionUnitDataSuccess(response.data));
      dispatch(commissionUnitGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated CommissionUnit",
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
      dispatch(updateCommissionUnitDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteCommissionUnit = (id, data) => async (dispatch) => {
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
      dispatch(commissionUnitGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
