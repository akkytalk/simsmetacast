import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";

const portLoadingSlice = createSlice({
  name: "portLoading",
  initialState: {
    postPortLoading: [],
    portLoading: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    portLoadingSetData: (state, action) => {
      state.portLoading = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    portLoadingFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    portLoadingLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    portLoadingPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    portLoadingUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postPortLoadingDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postPortLoadingDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postPortLoading = action.payload;
    },
    updatePortLoadingDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updatePortLoadingDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postPortLoading = action.payload;
    },
  },
});

export const {
  portLoadingSetData,
  portLoadingFailData,
  portLoadingLoading,
  portLoadingPostLoading,
  portLoadingUpdateLoading,
  postPortLoadingDataFail,
  postPortLoadingDataSuccess,
  updatePortLoadingDataFail,
  updatePortLoadingDataSuccess,
} = portLoadingSlice.actions;

export default portLoadingSlice.reducer;

export const url = "/loading-port";

export const portLoadingGetData = (data) => async (dispatch) => {
  dispatch(portLoadingLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(portLoadingSetData(response.data));
  } catch (error) {
    dispatch(portLoadingFailData(error.message));
  }
};

export const postPortLoadingData =
  (data, portLoading, toggle, setSubmitting) => async (dispatch) => {
    dispatch(portLoadingPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, portLoading, {
        headers: myheader,
      });
      dispatch(postPortLoadingDataSuccess(response.data));
      dispatch(portLoadingGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created PortLoading",
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
      dispatch(postPortLoadingDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updatePortLoadingData =
  (data, portLoading, toggle, setSubmitting) => async (dispatch) => {
    dispatch(portLoadingUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, portLoading, {
        headers: myheader,
      });

      dispatch(updatePortLoadingDataSuccess(response.data));
      dispatch(portLoadingGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated PortLoading",
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
      dispatch(updatePortLoadingDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deletePortLoading = (id, data) => async (dispatch) => {
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
      dispatch(portLoadingGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};
