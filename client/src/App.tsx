/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ImageItem from "./components/ImageItem";
import DeleteModal from "./components/modals/DeleteModal";
import Toast from "./components/shared/Toast";
import { IImageItem } from "./interface/interface";

// eslint-disable-next-line require-jsdoc
function App() {
  const [imageId, setImageId] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = "http://localhost:8080/photos/";

  const getAllPhotos = async () => {
    const response = await axios.get(url);
    setData(response.data.data);
  };

  useEffect(() => {
    getAllPhotos();
  }, []);

  return (
    <div className="App p-4 md:p-10 flex flex-col gap-20">
      <Header />
      <Toast type={"add"} />
      <div className="sm:columns-2 md:columns-3 gap-8 ">
        {data.map((item: IImageItem) => {
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
