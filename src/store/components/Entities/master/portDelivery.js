import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";

const portDeliverySlice = createSlice({
  name: "portDelivery",
  initialState: {
    postPortDelivery: [],
    portDelivery: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    portDeliverySetData: (state, action) => {
      state.portDelivery = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    portDeliveryFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    portDeliveryLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    portDeliveryPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    portDeliveryUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postPortDeliveryDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postPortDeliveryDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postPortDelivery = action.payload;
    },
    updatePortDeliveryDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updatePortDeliveryDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postPortDelivery = action.payload;
    },
  },
});

export const {
  portDeliverySetData,
  portDeliveryFailData,
  portDeliveryLoading,
  portDeliveryPostLoading,
  portDeliveryUpdateLoading,
  postPortDeliveryDataFail,
  postPortDeliveryDataSuccess,
  updatePortDeliveryDataFail,
  updatePortDeliveryDataSuccess,
} = portDeliverySlice.actions;

export default portDeliverySlice.reducer;

export const url = "/delivery-port";

export const portDeliveryGetData = (data) => async (dispatch) => {
  dispatch(portDeliveryLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(portDeliverySetData(response.data));
  } catch (error) {
    dispatch(portDeliveryFailData(error.message));
  }
};

export const postPortDeliveryData =
  (data, portDelivery, toggle, setSubmitting) => async (dispatch) => {
    dispatch(portDeliveryPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, portDelivery, {
        headers: myheader,
      });
      dispatch(postPortDeliveryDataSuccess(response.data));
      dispatch(portDeliveryGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created PortDelivery",
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
      dispatch(postPortDeliveryDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updatePortDeliveryData =
  (data, portDelivery, toggle, setSubmitting) => async (dispatch) => {
    dispatch(portDeliveryUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, portDelivery, {
        headers: myheader,
      });

      dispatch(updatePortDeliveryDataSuccess(response.data));
      dispatch(portDeliveryGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated PortDelivery",
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
      dispatch(updatePortDeliveryDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deletePortDelivery = (id, data) => async (dispatch) => {
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
      dispatch(portDeliveryGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};
