import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";

const commodityAnalysisSlice = createSlice({
  name: "commodityAnalysis",
  initialState: {
    postCommodityAnalysis: [],
    commodityAnalysis: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    commodityAnalysisSetData: (state, action) => {
      state.commodityAnalysis = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    commodityAnalysisFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    commodityAnalysisLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    commodityAnalysisPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    commodityAnalysisUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postCommodityAnalysisDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postCommodityAnalysisDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postCommodityAnalysis = action.payload;
    },
    updateCommodityAnalysisDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateCommodityAnalysisDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postCommodityAnalysis = action.payload;
    },
  },
});

export const {
  commodityAnalysisSetData,
  commodityAnalysisFailData,
  commodityAnalysisLoading,
  commodityAnalysisPostLoading,
  commodityAnalysisUpdateLoading,
  postCommodityAnalysisDataFail,
  postCommodityAnalysisDataSuccess,
  updateCommodityAnalysisDataFail,
  updateCommodityAnalysisDataSuccess,
} = commodityAnalysisSlice.actions;

export default commodityAnalysisSlice.reducer;

export const url = "/commodity-analysis";

export const commodityAnalysisGetData = (data) => async (dispatch) => {
  dispatch(commodityAnalysisLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(commodityAnalysisSetData(response.data));
  } catch (error) {
    dispatch(commodityAnalysisFailData(error.message));
  }
};

export const postCommodityAnalysisData =
  (data, commodityAnalysis, toggle, setSubmitting) => async (dispatch) => {
    dispatch(commodityAnalysisPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, commodityAnalysis, {
        headers: myheader,
      });
      dispatch(postCommodityAnalysisDataSuccess(response.data));
      dispatch(commodityAnalysisGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created CommodityAnalysis",
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
      dispatch(postCommodityAnalysisDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateCommodityAnalysisData =
  (data, commodityAnalysis, toggle, setSubmitting) => async (dispatch) => {
    dispatch(commodityAnalysisUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, commodityAnalysis, {
        headers: myheader,
      });

      dispatch(updateCommodityAnalysisDataSuccess(response.data));
      dispatch(commodityAnalysisGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated CommodityAnalysis",
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
      dispatch(updateCommodityAnalysisDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteCommodityAnalysis = (id, data) => async (dispatch) => {
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
      dispatch(commodityAnalysisGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};
