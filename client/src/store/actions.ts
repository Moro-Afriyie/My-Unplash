import axios from "axios";
import * as actionTypes from "./actions.types";
import { Dispatch } from "redux";

export const getAllPhotos = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loadingState());
      const response = await axios.get("http://localhost:8080/photos/");
      dispatch({
        type: actionTypes.GET_ALL_PHOTOS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch(errorState());
    }
  };
};

export const errorState = () => {
  return {
    type: actionTypes.ERROR,
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
    } catch (error) {
      dispatch(errorState());
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
    } catch (error) {
      dispatch(errorState());
    }
  };
};

export const closeToast = () => {
  return {
    type: actionTypes.CLOSE_TOAST,
  };
};
