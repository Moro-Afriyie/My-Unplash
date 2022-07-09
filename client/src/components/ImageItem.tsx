import * as React from "react";

interface IImageItemProps {
  imageUrl: string;
  id: string;
  label: string;
  setImageId: React.Dispatch<React.SetStateAction<string>>;
}

const ImageItem: React.FunctionComponent<IImageItemProps> = ({
  imageUrl,
  label,
  id,
  setImageId,
}) => {
  return (
    <div className="font-montserrat mb-4 mt-0 sm:mb-8 w-full h-full relative cursor-pointer sm:rounded-3xl overflow-hidden group min-w-0 break-inside-avoid">
      <img
        className="w-full h-full sm:rounded-3xl object-cover"
        src={imageUrl}
        alt={label}
      />
      <div className="absolute sm:rounded-3xl p-6 flex flex-col justify-between top-0 left-0 w-full h-full bg-overlay transition-all scale-0 group-hover:scale-100 ease-in-out duration-200 delay-100">
        <button
          className="self-end w-[3.938rem] border border-red h-6 text-center rounded-[2.375rem] text-red text-[0.625rem]"
          onClick={() => setImageId(id)}
        >
          delete
        </button>
        <p className="text-white text-lg font-bold">{label}</p>
      </div>
    </div>
  );
};

export default ImageItem;
