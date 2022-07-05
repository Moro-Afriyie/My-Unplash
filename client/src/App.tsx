import React from "react";
import ImageItem from "./components/ImageItem";
import { IImageItem } from "./interface/interface";
import { images } from "./static/data";

// eslint-disable-next-line require-jsdoc
function App() {
  const data = images;

  const splitArray = (arr: IImageItem[], size: number) => {
    const result: any = [[], [], []];

    const wordsPerLine = Math.ceil(arr.length / size);

    for (let line = 0; line < size; line++) {
      for (let i = 0; i < wordsPerLine; i++) {
        const value = arr[i + line * wordsPerLine];
        if (!value) continue;
        result[line].push(value);
      }
    }

    return result;
  };

  const imageItems = splitArray(data, 3);
  // console.log(imageItems);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="image-gallery flex flex-col md:flex-row gap-8">
        {imageItems.map((item: IImageItem[], index: number) => {
          return (
            <div className="column flex flex-col gap-8" key={index}>
              {item.map((image: IImageItem) => {
                return <ImageItem imageUrl={image.imageUrl} key={image.id} />;
              })}
            </div>
          );
        })}

        {/* // <div className="column flex flex-col gap-8">
        //   <ImageItem imageUrl="https://source.unsplash.com/VWcPlbHglYc" />
        //   <ImageItem imageUrl="https://source.unsplash.com/e6FMMambeO4" />
        //   <ImageItem imageUrl="https://source.unsplash.com/klCiPmzUw0Y" />
        //   <ImageItem imageUrl="https://source.unsplash.com/O0N9MF--hK4" />
        // </div>
        // <div className="column flex flex-col gap-8">
        //   <ImageItem imageUrl="https://source.unsplash.com/FV3GConVSss" />
        //   <ImageItem imageUrl="https://source.unsplash.com/0ESjL-Nw22Y" />
        //   <ImageItem imageUrl="https://source.unsplash.com/KTVn62x6fFw" />
        //   <ImageItem imageUrl="https://source.unsplash.com/VSeVhmW4_JQ" />
        // </div>
        // <div className="column flex flex-col gap-8">
        //   <ImageItem imageUrl="https://source.unsplash.com/07aFaTf24Kg" />
        //   <ImageItem imageUrl="https://source.unsplash.com/DqyYTM7pR2o" />
        //   <ImageItem imageUrl="https://source.unsplash.com/IdNOTjPeHrE" />
        //   <ImageItem imageUrl="https://source.unsplash.com/O0N9MF--hK4" /> */}
      </div>
    </div>
  );
}

export default App;
