import React from "react";
import Header from "./components/Header";
import ImageItem from "./components/ImageItem";
import { IImageItem } from "./interface/interface";
import { images } from "./static/data";

const data = images;
// eslint-disable-next-line require-jsdoc
function App() {
  return (
    <div className="App p-4 md:p-10 flex flex-col gap-20">
      <Header />
      <div className="sm:columns-2 md:columns-3 gap-8 ">
        {data.map((item: IImageItem) => {
          return (
            <ImageItem
              imageUrl={item.imageUrl}
              id={item.id}
              label={item.label}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
