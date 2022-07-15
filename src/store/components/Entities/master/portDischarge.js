import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";

const portDischargeSlice = createSlice({
  name: "portDischarge",
  initialState: {
    postPortDischarge: [],
    portDischarge: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    portDischargeSetData: (state, action) => {
      state.portDischarge = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    portDischargeFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    portDischargeLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    portDischargePostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    portDischargeUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postPortDischargeDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postPortDischargeDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postPortDischarge = action.payload;
    },
    updatePortDischargeDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updatePortDischargeDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postPortDischarge = action.payload;
    },
  },
});

export const {
  portDischargeSetData,
  portDischargeFailData,
  portDischargeLoading,
  portDischargePostLoading,
  portDischargeUpdateLoading,
  postPortDischargeDataFail,
  postPortDischargeDataSuccess,
  updatePortDischargeDataFail,
  updatePortDischargeDataSuccess,
} = portDischargeSlice.actions;

export default portDischargeSlice.reducer;

export const url = "/discharge-port";

export const portDischargeGetData = (data) => async (dispatch) => {
  dispatch(portDischargeLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(portDischargeSetData(response.data));
  } catch (error) {
    dispatch(portDischargeFailData(error.message));
  }
};

export const postPortDischargeData =
  (data, portDischarge, toggle, setSubmitting) => async (dispatch) => {
    dispatch(portDischargePostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, portDischarge, {
        headers: myheader,
      });
      dispatch(postPortDischargeDataSuccess(response.data));
      dispatch(portDischargeGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created PortDischarge",
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
      dispatch(postPortDischargeDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updatePortDischargeData =
  (data, portDischarge, toggle, setSubmitting) => async (dispatch) => {
    dispatch(portDischargeUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, portDischarge, {
        headers: myheader,
      });

      dispatch(updatePortDischargeDataSuccess(response.data));
      dispatch(portDischargeGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated PortDischarge",
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
      dispatch(updatePortDischargeDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deletePortDischarge = (id, data) => async (dispatch) => {
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
      dispatch(portDischargeGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};
