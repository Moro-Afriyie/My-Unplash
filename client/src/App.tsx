/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import ImageItem from "./components/ImageItem";
import DeleteModal from "./components/modals/DeleteModal";
import Toast from "./components/shared/Toast";
import { IImageItem, ToastOptions } from "./interface/interface";
import { AppDispatch, RootState } from "./store";
import { getAllPhotos } from "./store/actions";

// eslint-disable-next-line require-jsdoc
function App() {
  const [imageId, setImageId] = useState("");

  const dispatch: any = useDispatch();

  const { photos, loading, error, toast } = useSelector(
    (state: RootState) => state
  );

  useEffect(() => {
    dispatch(getAllPhotos());
  }, []);

  return (
    <div className="App p-4 md:p-10 flex flex-col gap-20">
      <Header />
      {toast !== "" && <Toast type={toast} />}
      <div className="sm:columns-2 md:columns-3 gap-8 ">
        {photos.map((item: IImageItem) => {
          return (
            <ImageItem
              imageUrl={item.imageUrl}
              id={item.id}
              label={item.label}
              key={item.id}
              setImageId={setImageId}
            />
          );
        })}
      </div>
      {imageId !== "" && <DeleteModal setImageId={setImageId} id={imageId} />}
    </div>
  );
}

export default App;
