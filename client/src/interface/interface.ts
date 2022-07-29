/* eslint-disable no-unused-vars */
export interface IImageItem {
  id: string;
  imageUrl: string;
  label: string;
}

export enum ToastOptions {
  DELETE = "delete",
  SUCCESS = "success",
  ERROR = "error",
  CLOSE = "",
}
