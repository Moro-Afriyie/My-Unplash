import axios from "axios";
import * as actionTypes from "./actions.types";
import { Dispatch } from "redux";

export const getAllPhotos = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loadingState());
      const response = await axios.get("http://localhost:8080/photos/");
      if (response.data.error) {
        dispatch(errorState(response.data.message));
      }

      dispatch({
        type: actionTypes.GET_ALL_PHOTOS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch(errorState("An unexpected error occurred please try again"));
    }
  };
};

export const errorState = (message: string) => {
  return {
    type: actionTypes.ERROR,
  };
};

export const toggleDeleteModal = () => {
  return {
    type: actionTypes.TOGGLE_DELETE_MODAL,
  };
};

export const toggleAddModal = () => {
  return {
    type: actionTypes.TOGGLE_DELETE_MODAL,
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
      const response = await axios.delete(`http://localhost:8080/photos/${id}`);
      dispatch({
        type: actionTypes.DELETE_PHOTO,
        payload: response.data.data,
      });
      dispatch(toggleDeleteModal());
    } catch (error) {
      dispatch(errorState("An unexpected error occurred please try again"));
    }
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
      const response = await axios.post(`http://localhost:8080/photos/`, {
        label,
        imageUrl,
      });
      dispatch({
        type: actionTypes.ADD_PHOTO,
        payload: response.data.data,
      });
      dispatch(toggleDeleteModal());
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
