import React from "react";
import ImageItem from "./components/ImageItem";
import { IImageItem } from "./interface/interface";
import { images } from "./static/data";

const data = images;
// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <div className="App p-6 md:p-10">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="sm:columns-2 md:columns-3 gap-8 ">
        {data.map((item: IImageItem) => {
          return <ImageItem imageUrl={item.imageUrl} key={item.id} />;
        })}
      </div>
    </div>
  );
}

export default App;
