import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";

const weightUnitSlice = createSlice({
  name: "weightUnit",
  initialState: {
    postWeightUnit: [],
    weightUnit: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    weightUnitSetData: (state, action) => {
      state.weightUnit = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    weightUnitFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    weightUnitLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    weightUnitPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    weightUnitUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postWeightUnitDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postWeightUnitDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postWeightUnit = action.payload;
    },
    updateWeightUnitDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateWeightUnitDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postWeightUnit = action.payload;
    },
  },
});

export const {
  weightUnitSetData,
  weightUnitFailData,
  weightUnitLoading,
  weightUnitPostLoading,
  weightUnitUpdateLoading,
  postWeightUnitDataFail,
  postWeightUnitDataSuccess,
  updateWeightUnitDataFail,
  updateWeightUnitDataSuccess,
} = weightUnitSlice.actions;

export default weightUnitSlice.reducer;

export const url = "/weight-unit";

export const weightUnitGetData = (data) => async (dispatch) => {
  dispatch(weightUnitLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(weightUnitSetData(response.data));
  } catch (error) {
    dispatch(weightUnitFailData(error.message));
  }
};

export const postWeightUnitData =
  (data, weightUnit, toggle, setSubmitting) => async (dispatch) => {
    dispatch(weightUnitPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, weightUnit, {
        headers: myheader,
      });
      dispatch(postWeightUnitDataSuccess(response.data));
      dispatch(weightUnitGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created WeightUnit",
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
      dispatch(postWeightUnitDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateWeightUnitData =
  (data, weightUnit, toggle, setSubmitting) => async (dispatch) => {
    dispatch(weightUnitUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, weightUnit, {
        headers: myheader,
      });

      dispatch(updateWeightUnitDataSuccess(response.data));
      dispatch(weightUnitGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated WeightUnit",
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
      dispatch(updateWeightUnitDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteWeightUnit = (id, data) => async (dispatch) => {
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
      dispatch(weightUnitGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};
