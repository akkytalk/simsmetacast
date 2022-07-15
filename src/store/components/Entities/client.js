import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";
import moment from "moment";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    client: [],
    postClient: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
    lastFetch: null,
  },
  reducers: {
    clientSetData: (state, action) => {
      state.client = action.payload;
      state.lastFetch = Date.now();
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    clientFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    clientLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    clientPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    clientUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postClientDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postClientDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postClient = action.payload;
    },
    updateClientDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateClientDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postClient = action.payload;
    },
  },
});

export const {
  clientSetData,
  clientFailData,
  clientLoading,
  clientPostLoading,
  clientUpdateLoading,
  postClientDataFail,
  postClientDataSuccess,
  updateClientDataFail,
  updateClientDataSuccess,
} = clientSlice.actions;

export default clientSlice.reducer;

const url = "/clients";
const timeDifferenceInMinutes = 120;

export const clientGetData =
  (data, updateLastFetch) => async (dispatch, getState) => {
    if (!updateLastFetch) {
      const { lastFetch } = getState().entities?.client;
      const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
      if (diffInMinutes < timeDifferenceInMinutes) return;
    }

    dispatch(clientLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.get(url, {
        headers: myheader,
      });
      dispatch(clientSetData(response.data));
    } catch (error) {
      dispatch(clientFailData(error.message));
    }
  };

export const postClientData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(clientPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, user, {
        headers: myheader,
      });
      dispatch(postClientDataSuccess(response.data));
      dispatch(clientGetData(data, updateLastFetch));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created Client",
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
      dispatch(postClientDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateClientData =
  (data, user, toggle, setSubmitting) => async (dispatch) => {
    let updateLastFetch = true;
    dispatch(clientUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, user, {
        headers: myheader,
      });

      dispatch(updateClientDataSuccess(response.data));
      dispatch(clientGetData(data, updateLastFetch));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated Client",
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
      dispatch(updateClientDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteClient = (id, data) => async (dispatch) => {
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
      dispatch(clientGetData(data, updateLastFetch));
    });
  } catch (error) {
    console.log(error);
  }
};
