import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";

const containerSizeSlice = createSlice({
  name: "containerSize",
  initialState: {
    postContainerSize: [],
    containerSize: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    containerSizeSetData: (state, action) => {
      state.containerSize = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    containerSizeFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    containerSizeLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    containerSizePostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    containerSizeUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postContainerSizeDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postContainerSizeDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postContainerSize = action.payload;
    },
    updateContainerSizeDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateContainerSizeDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postContainerSize = action.payload;
    },
  },
});

export const {
  containerSizeSetData,
  containerSizeFailData,
  containerSizeLoading,
  containerSizePostLoading,
  containerSizeUpdateLoading,
  postContainerSizeDataFail,
  postContainerSizeDataSuccess,
  updateContainerSizeDataFail,
  updateContainerSizeDataSuccess,
} = containerSizeSlice.actions;

export default containerSizeSlice.reducer;

export const url = "/containers";

export const containerSizeGetData = (data) => async (dispatch) => {
  dispatch(containerSizeLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(containerSizeSetData(response.data));
  } catch (error) {
    dispatch(containerSizeFailData(error.message));
  }
};

export const postContainerSizeData =
  (data, containerSize, toggle, setSubmitting) => async (dispatch) => {
    dispatch(containerSizePostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, containerSize, {
        headers: myheader,
      });
      dispatch(postContainerSizeDataSuccess(response.data));
      dispatch(containerSizeGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created ContainerSize",
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
      dispatch(postContainerSizeDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateContainerSizeData =
  (data, containerSize, toggle, setSubmitting) => async (dispatch) => {
    dispatch(containerSizeUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, containerSize, {
        headers: myheader,
      });

      dispatch(updateContainerSizeDataSuccess(response.data));
      dispatch(containerSizeGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated ContainerSize",
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
      dispatch(updateContainerSizeDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteContainerSize = (id, data) => async (dispatch) => {
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
      dispatch(containerSizeGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};
