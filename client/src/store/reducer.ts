import { ToastOptions } from "./../interface/interface";
import { IImageItem } from "../interface/interface";
import * as actionTypes from "./actions.types";

interface InitialState {
  photos: IImageItem[];
  toast: ToastOptions;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  photos: [],
  loading: false,
  error: null,
  toast: ToastOptions.CLOSE,
};

type Action =
  | {
      type: typeof actionTypes.GET_ALL_PHOTOS;
      payload: IImageItem[];
    }
  | { type: typeof actionTypes.LOADING }
  | { type: typeof actionTypes.ERROR }
  | { type: typeof actionTypes.SUCCESS }
  | { type: typeof actionTypes.ADD_PHOTO; payload: IImageItem[] }
  | { type: typeof actionTypes.DELETE_PHOTO; payload: IImageItem[] }
  | { type: typeof actionTypes.CLOSE_TOAST };

export const photoReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PHOTOS:
      return {
        ...state,
        photos: action.payload,
        loading: false,
      };
    case actionTypes.DELETE_PHOTO:
      return {
        ...state,
        photos: action.payload,
        loading: false,
        toast: ToastOptions.DELETE,
      };
    case actionTypes.ADD_PHOTO:
      return {
        ...state,
        photos: action.payload,
        loading: false,
        toast: ToastOptions.ADD,
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
    case actionTypes.ERROR: {
      return {
        ...state,
        error: "",
      };
    }
    default:
      return state;
  }
};
