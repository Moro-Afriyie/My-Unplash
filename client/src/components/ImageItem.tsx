import * as React from "react";

interface IImageItemProps {}

const ImageItem: React.FunctionComponent<IImageItemProps> = (props) => {
  return (
    <div className="relative cursor-pointer rounded-3xl overflow-hidden">
      <img
        className="w-full h-full object-cover"
        src="https://source.unsplash.com/VWcPlbHglYc"
        alt="imgae 1"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-overlay">
        <p>Image title</p>
        <button>delete</button>
      </div>
    </div>
  );
};

export default ImageItem;
