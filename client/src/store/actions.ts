import { baseUrl } from "./../config";
import axios from "axios";
import * as actionTypes from "./actions.types";
import { Dispatch } from "redux";

export const getAllPhotos = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(photoLoadingState());
      const response = await axios.get(`${baseUrl}/photos/`);
      if (response.data.error) {
        dispatch(errorState(response.data.message));
        setTimeout(() => {
          dispatch(closeToast());
        }, 3000);
      }

      dispatch({
        type: actionTypes.GET_ALL_PHOTOS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch(errorState("An unexpected error occurred please try again"));
      setTimeout(() => {
        dispatch(closeToast());
      }, 3000);
    }
  };
};

export const errorState = (message: string) => {
  return {
    type: actionTypes.ERROR,
    payload: message,
  };
};

export const toggleAddModal = () => {
  return {
    type: actionTypes.TOGGLE_ADD_MODAL,
  };
};

export const loadingState = () => {
  return {
    type: actionTypes.LOADING,
  };
};

export const deletePhoto = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loadingState());
      const response = await axios.delete(`${baseUrl}/photos/${id}`);
      if (response.data.error) {
        dispatch(errorState(response.data.message));
        setTimeout(() => {
          dispatch(closeToast());
        }, 3000);
      }
      dispatch({
        type: actionTypes.DELETE_PHOTO,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch(errorState("An unexpected error occurred please try again")),
        setTimeout(() => {
          dispatch(closeToast());
        }, 3000);
    }
  };
};

export const photoLoadingState = () => {
  return {
    type: actionTypes.PHOTOS_LOADING,
  };
};
export const addPhoto = ({
  imageUrl,
  label,
}: {
  imageUrl: string;
  label: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loadingState());
      const response = await axios.post(`${baseUrl}/photos/`, {
        label,
        imageUrl,
      });
      dispatch({
        type: actionTypes.ADD_PHOTO,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch(errorState("An unexpected error occurred please try again"));
    }
  };
};

export const closeToast = () => {
  return {
    type: actionTypes.CLOSE_TOAST,
  };
};

export const searchForPhotos = (searchTerm: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(photoLoadingState());
      const response = await axios.get(
        `${baseUrl}/photos/search/filter?searchTerm=${searchTerm}`
      );
      if (response.data.error) {
        dispatch(errorState(response.data.message));
        setTimeout(() => {
          dispatch(closeToast());
        }, 3000);
      }

      dispatch({
        type: actionTypes.GET_ALL_PHOTOS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch(errorState("An unexpected error occurred please try again"));
      setTimeout(() => {
        dispatch(closeToast());
      }, 3000);
    }
  };
};

export const setImageId = (id: string) => {
  return {
    type: actionTypes.SET_IMAGE_ID,
    payload: id,
  };
};
