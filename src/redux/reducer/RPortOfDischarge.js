import * as actionType from "../types/ActionTypes";

const initialState = {
  portDischarge: [],
  postPortDischarge: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const PortDischarge = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PORT_DISCHARGE_SET_DATA:
      return {
        ...state,
        portDischarge: action.portDischarge,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.PORT_DISCHARGE_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.PORT_DISCHARGE_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.PORT_DISCHARGE_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.PORT_DISCHARGE_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_PORT_DISCHARGE_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_PORT_DISCHARGE_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postPortDischarge: action.postPortDischarge,
      };
    case actionType.UPDATE_PORT_DISCHARGE_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PORT_DISCHARGE_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_PORT_DISCHARGE_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
