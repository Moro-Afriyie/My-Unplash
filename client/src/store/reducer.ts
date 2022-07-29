import { ToastOptions } from "./../interface/interface";
import { IImageItem } from "../interface/interface";
import * as actionTypes from "./actions.types";

interface InitialState {
  photos: IImageItem[];
  toast: ToastOptions;
  photoLoading: boolean;
  loading: boolean;
  toastMessage: string;
  addModalState: boolean;
  deleteModalState: boolean;
}

const initialState: InitialState = {
  photos: [],
  loading: false,
  toast: ToastOptions.CLOSE,
  toastMessage: "",
  addModalState: false,
  deleteModalState: false,
  photoLoading: false,
};

type Action =
  | {
      type: typeof actionTypes.GET_ALL_PHOTOS;
      payload: IImageItem[];
    }
  | { type: typeof actionTypes.LOADING }
  | { type: typeof actionTypes.ERROR; payload: string }
  | { type: typeof actionTypes.SUCCESS }
  | { type: typeof actionTypes.ADD_PHOTO; payload: IImageItem[] }
  | { type: typeof actionTypes.DELETE_PHOTO; payload: IImageItem[] }
  | { type: typeof actionTypes.CLOSE_TOAST }
  | { type: typeof actionTypes.TOGGLE_DELETE_MODAL }
  | { type: typeof actionTypes.PHOTOS_LOADING }
  | { type: typeof actionTypes.TOGGLE_ADD_MODAL };

export const photoReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PHOTOS:
      return {
        ...state,
        photos: action.payload,
        loading: false,
        photoLoading: false,
      };
    case actionTypes.DELETE_PHOTO:
      return {
        ...state,
        photos: action.payload,
        loading: false,
        toast: ToastOptions.DELETE,
        toastMessage: "Photo deleted",
        deleteModalState: false,
      };
    case actionTypes.ADD_PHOTO:
      return {
        ...state,
        photos: action.payload,
        loading: false,
        toast: ToastOptions.SUCCESS,
        toastMessage: "Photo added",
        addModalState: false,
      };

    case actionTypes.CLOSE_TOAST: {
      return {
        ...state,
        toast: ToastOptions.CLOSE,
      };
    }
    case actionTypes.LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.PHOTOS_LOADING: {
      return {
        ...state,
        photoLoading: true,
      };
    }
    case actionTypes.ERROR: {
      return {
        ...state,
        loading: false,
        toast: ToastOptions.ERROR,
        toastMessage: action.payload,
      };
    }

    case actionTypes.TOGGLE_DELETE_MODAL: {
      return {
        ...state,
        deleteModalState: !state.deleteModalState,
      };
    }

    case actionTypes.TOGGLE_ADD_MODAL: {
      return {
        ...state,
        addModalState: !state.addModalState,
      };
    }
    default:
      return state;
  }
};
