import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "shared/axios";
import Swal from "sweetalert2";

const stateSlice = createSlice({
  name: "state",
  initialState: {
    postState: [],
    state: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    stateSetData: (state, action) => {
      state.state = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    stateFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    stateLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    statePostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    stateUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postStateDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postStateDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postState = action.payload;
    },
    updateStateDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateStateDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postState = action.payload;
    },
  },
});

export const {
  stateSetData,
  stateFailData,
  stateLoading,
  statePostLoading,
  stateUpdateLoading,
  postStateDataFail,
  postStateDataSuccess,
  updateStateDataFail,
  updateStateDataSuccess,
} = stateSlice.actions;

export default stateSlice.reducer;

const url = "/states";
const timeDifferenceInMinutes = 1440 * 10;

export const stateGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    // implement caching
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities.address.country;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }
    dispatch(stateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(stateSetData(response.data));
    } catch (error) {
      dispatch(stateFailData(error.message));
    }
  };

export const postStateData =
  (data, state, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(statePostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, state, {
        headers: myheader,
      });
      dispatch(postStateDataSuccess(response.data));
      dispatch(stateGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created State",
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
      dispatch(postStateDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateStateData =
  (data, state, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(stateUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, state, {
        headers: myheader,
      });

      dispatch(updateStateDataSuccess(response.data));
      dispatch(stateGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated State",
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
      dispatch(updateStateDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteState = (id, data) => async (dispatch) => {
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
      dispatch(stateGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
