import * as actionType from "../types/ActionTypes";

const initialState = {
  courier: [],
  postCourier: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const Courier = (state = initialState, action) => {
  switch (action.type) {
    case actionType.COURIERS_SET_DATA:
      return {
        ...state,
        courier: action.courier,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.COURIERS_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.COURIERS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.COURIERS_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.COURIERS_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_COURIERS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_COURIERS_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postCourier: action.postCourier,
      };
    case actionType.UPDATE_COURIERS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_COURIERS_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_COURIERS_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
