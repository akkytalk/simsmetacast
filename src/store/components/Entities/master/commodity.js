import { createSlice } from "@reduxjs/toolkit";
import axios from "shared/axios";
import Swal from "sweetalert2";

const commoditySlice = createSlice({
  name: "commodity",
  initialState: {
    postCommodity: [],
    commodity: [],
    error: false,
    isLoading: false,
    isPostLoading: false,
    isUpdateLoading: false,
  },
  reducers: {
    commoditySetData: (state, action) => {
      state.commodity = action.payload;
      state.error = false;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    commodityFailData: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    commodityLoading: (state, action) => {
      state.isLoading = true;
      state.error = false;
    },
    commodityPostLoading: (state, action) => {
      state.isPostLoading = true;
      state.error = false;
    },
    commodityUpdateLoading: (state, action) => {
      state.isUpdateLoading = true;
      state.error = false;
    },
    postCommodityDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
    },
    postCommodityDataSuccess: (state, action) => {
      state.isPostLoading = false;
      state.error = false;
      state.postCommodity = action.payload;
    },
    updateCommodityDataFail: (state, action) => {
      state.error = action.payload;
      state.isPostLoading = false;
      state.isUpdateLoading = false;
    },
    updateCommodityDataSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.error = false;
      state.postCommodity = action.payload;
    },
  },
});

export const {
  commoditySetData,
  commodityFailData,
  commodityLoading,
  commodityPostLoading,
  commodityUpdateLoading,
  postCommodityDataFail,
  postCommodityDataSuccess,
  updateCommodityDataFail,
  updateCommodityDataSuccess,
} = commoditySlice.actions;

export default commoditySlice.reducer;

export const url = "/commodities";

export const commodityGetData = (data) => async (dispatch) => {
  dispatch(commodityLoading());
  try {
    const myheader = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.token,
    };
    const response = await axios.get(url, {
      headers: myheader,
    });
    dispatch(commoditySetData(response.data));
  } catch (error) {
    dispatch(commodityFailData(error.message));
  }
};

export const postCommodityData =
  (data, commodity, toggle, setSubmitting) => async (dispatch) => {
    dispatch(commodityPostLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.post(url, commodity, {
        headers: myheader,
      });
      dispatch(postCommodityDataSuccess(response.data));
      dispatch(commodityGetData(data));

      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Created Commodity",
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
      dispatch(postCommodityDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const updateCommodityData =
  (data, commodity, toggle, setSubmitting) => async (dispatch) => {
    dispatch(commodityUpdateLoading());
    try {
      const myheader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      };
      const response = await axios.put(url + `/${data.id}`, commodity, {
        headers: myheader,
      });

      dispatch(updateCommodityDataSuccess(response.data));
      dispatch(commodityGetData(data));
      Swal.fire({
        position: "success",
        icon: "success",
        title: "Successfully Updated Commodity",
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
      dispatch(updateCommodityDataFail(error.message));
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  };

export const deleteCommodity = (id, data) => async (dispatch) => {
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
      dispatch(commodityGetData(data));
    });
  } catch (error) {
    console.log(error);
  }
};
