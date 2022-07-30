import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { closeToast, deletePhoto, setImageId } from "../../store/actions";
import Input from "../shared/input";
import Loader from "../shared/Loader";

interface IDeleteModalProps {}

const DeleteModal: React.FunctionComponent<IDeleteModalProps> = (props) => {
  const [password, setPassword] = React.useState("");
  const dispatch: any = useDispatch();

  const { loading, imageId } = useSelector((state: RootState) => state);

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deletePhoto(imageId));
    setTimeout(() => {
      dispatch(closeToast());
    }, 3000);
  };

  return (
    <div
      id="defaultModal"
      className="bg-modalBackground font-noto-sans flex items-center justify-center overflow-y-auto fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-2xl h-full min-h-screen flex items-center justify-center ">
        <div className="relative  p-8 bg-white rounded-xl w-full flex flex-col gap-5 max-w-[38.75rem] min-h-[17.258rem]">
          <p className="text-2xl font-medium">Are you sure?</p>
          <form
            className="flex flex-col flex-grow gap-8 sm:justify-between"
            onSubmit={(e) => handleDelete(e)}
          >
            <Input
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name={"password"}
            />

            <div className="flex items-center gap-8 justify-end ">
              <button
                data-modal-toggle="defaultModal"
                type="button"
                className="text-grey border-none outline-none"
                onClick={() => dispatch(setImageId(""))}
              >
                Cancel
              </button>
              <button
                data-modal-toggle="defaultModal"
                type="submit"
                className="text-white px-6 h-[3.438rem] rounded-xl bg-red shadow-buttonShadow "
              >
                {loading ? <Loader text="Deleting..." /> : "Delete"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
