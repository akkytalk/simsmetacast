import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";
import moment from "moment";

const qualityMatchSlice = createSlice({
  name: "qualityMatch",
  initialState: {
    qualityMatch: [],
    postQualityMatch: [],
    currentQualityMatch: {},
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    qualityMatchSetData: (state, action) => {
      state.qualityMatch = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },

    qualityMatchFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    qualityMatchLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    qualityMatchPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    qualityMatchUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postQualityMatchDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postQualityMatchDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postQualityMatch = action.payload;
    },
    updateQualityMatchDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateQualityMatchDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postQualityMatch = action.payload;
    },
  },
});

export const {
  qualityMatchSetData,
  qualityMatchFailData,
  qualityMatchLoading,
  qualityMatchPostLoading,
  qualityMatchUpdateLoading,
  postQualityMatchDataFail,
  postQualityMatchDataSuccess,
  updateQualityMatchDataFail,
  updateQualityMatchDataSuccess,
} = qualityMatchSlice.actions;

export default qualityMatchSlice.reducer;

const url = "/quality-matches";
const timeDifferenceInMinutes = 120;

export const qualityMatchGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.importer?.qualityMatch;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }

    dispatch(qualityMatchLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(qualityMatchSetData(response.data));
    } catch (error) {
      dispatch(qualityMatchFailData(error.message));
    }
  };

export const postQualityMatchData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(qualityMatchPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      dispatch(postQualityMatchDataSuccess(response.data));
      dispatch(qualityMatchGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created QualityMatch",
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
      dispatch(postQualityMatchDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateQualityMatchData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(qualityMatchUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url + `/${data.id}?_method=PUT`, user, {
        headers: myheader,
      });

      dispatch(updateQualityMatchDataSuccess(response.data));
      dispatch(qualityMatchGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated QualityMatch",
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
      dispatch(updateQualityMatchDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteQualityMatch = (id, data) => async (dispatch) => {
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
      dispatch(qualityMatchGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
