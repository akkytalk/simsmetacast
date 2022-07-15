import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "shared/axios";
import Swal from "sweetalert2";

const dutySlice = createSlice({
  name: "duty",
  initialState: {
    postDuty: [],
    duty: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    dutySetData: (state, action) => {
      state.duty = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    dutyFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    dutyLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    dutyPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    dutyUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postDutyDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postDutyDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postDuty = action.payload;
    },
    updateDutyDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateDutyDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postDuty = action.payload;
    },
  },
});

export const {
  dutySetData,
  dutyFailData,
  dutyLoading,
  dutyPostLoading,
  dutyUpdateLoading,
  postDutyDataFail,
  postDutyDataSuccess,
  updateDutyDataFail,
  updateDutyDataSuccess,
} = dutySlice.actions;

export default dutySlice.reducer;

const url = "/duties";
const timeDifferenceInMinutes = 120;

export const dutyGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.master.duty;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }
    dispatch(dutyLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(dutySetData(response.data));
    } catch (error) {
      dispatch(dutyFailData(error.message));
    }
  };

export const postDutyData =
  (data, duty, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(dutyPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, duty, {
        headers: myheader,
      });
      dispatch(postDutyDataSuccess(response.data));
      dispatch(dutyGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created Duty",
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
      dispatch(postDutyDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateDutyData =
  (data, duty, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(dutyUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, duty, {
        headers: myheader,
      });

      dispatch(updateDutyDataSuccess(response.data));
      dispatch(dutyGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated Duty",
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
      dispatch(updateDutyDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteDuty = (id, data) => async (dispatch) => {
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
      dispatch(dutyGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
