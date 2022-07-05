import * as React from "react";

interface IImageItemProps {}

const ImageItem: React.FunctionComponent<IImageItemProps> = (props) => {
  return (
    <div className="relative cursor-pointer rounded-3xl overflow-hidden group min-w-0">
      <img
        className="w-full h-full object-cover"
        src="https://source.unsplash.com/VWcPlbHglYc"
        alt="imgae 1"
      />
      <div className="absolute p-6 flex flex-col justify-between top-0 left-0 w-full h-full bg-overlay transition-all scale-1 group-hover:scale-100 ease-in-out duration-200 delay-100">
        <button className="self-end w-[3.938rem] border border-red h-6 text-center rounded-[2.375rem] text-red text-[0.625rem]">
          delete
        </button>
        <p className="mb-4 text-white text-lg font-bold">Image title</p>
      </div>
    </div>
  );
};

export default ImageItem;
