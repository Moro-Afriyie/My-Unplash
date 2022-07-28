/* eslint-disable no-unused-vars */
import axios from "axios";
import * as React from "react";
import { ToastOptions } from "../../interface/interface";
import Input from "../shared/input";
import Loader from "../shared/Loader";

interface IAddModalProps {
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  setToast: React.Dispatch<React.SetStateAction<ToastOptions>>;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const AddModal: React.FunctionComponent<IAddModalProps> = ({
  onCloseModal,
  setToast,
  setData,
}) => {
  const [label, setLabel] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post("http://localhost:8080/photos/", {
      label,
      imageUrl,
    });
    setData(response.data.data);
    setLoading(false);
    onCloseModal(false);
    setToast(ToastOptions.ADD);

    setTimeout(() => {
      setToast(ToastOptions.CLOSE);
    }, 3000);
  };

  return (
    <div
      id="defaultModal"
      className="bg-modalBackground font-noto-sans flex items-center justify-center overflow-y-auto fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-2xl h-full min-h-screen flex items-center justify-center ">
        {/* <!-- Modal content --> */}
        <div className="relative  p-8 bg-white rounded-xl w-full flex flex-col gap-5 max-w-[38.75rem] min-h-[22.95rem]">
          <p className="text-2xl font-medium">Add a new photo</p>
          <form
            className="flex flex-col flex-grow gap-8 sm:justify-between"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Input
              label="Label"
              onChange={(e) => setLabel(e.target.value)}
              value={label}
              type="text"
              placeholder={"Suspendisse elit massa"}
              name={"label"}
            />
            <Input
              label="Photo URL"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
              type="text"
              placeholder={
                "https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
              }
              name={"photoUrl"}
            />
            <div className="flex items-center gap-8 justify-end ">
              <button
                data-modal-toggle="defaultModal"
                type="button"
                className="text-grey border-none outline-none"
                onClick={() => onCloseModal(false)}
              >
                Cancel
              </button>
              <button
                data-modal-toggle="defaultModal"
                type="submit"
                className="text-white px-6 h-[3.438rem] rounded-xl bg-green shadow-buttonShadow "
              >
                {loading ? <Loader text="Uploading..." /> : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
