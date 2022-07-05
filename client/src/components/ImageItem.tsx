import * as React from "react";

interface IImageItemProps {}

const ImageItem: React.FunctionComponent<IImageItemProps> = (props) => {
  return (
    <div className="relative cursor-pointer rounded-3xl overflow-hidden group">
      <img
        className="w-full h-full object-cover"
        src="https://source.unsplash.com/VWcPlbHglYc"
        alt="imgae 1"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-overlay transition-all scale-0 group-hover:scale-100 ease-in-out duration-200 delay-100">
        <p>Image title</p>
        <button className="w-[3.938rem] border border-red h-6">delete</button>
      </div>
    </div>
  );
};

export default ImageItem;
