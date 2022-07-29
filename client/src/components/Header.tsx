import * as React from "react";
import logo from "../assets/my_unsplash_logo.svg";
import { Icon } from "@iconify/react";
import AddModal from "./modals/AddModal";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { toggleAddModal } from "../store/actions";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { addModalState } = useSelector((state: RootState) => state);

  const dispatch: any = useDispatch();

  return (
    <header className="flex flex-wrap gap-4 justify-between w-full items-center font-noto-sans">
      <img src={logo} alt="logo" />
      <div className="w-full sm:w-[18.75rem] overflow-hidden  rounded-lg relative flex gap-3 items-center justify-center h-[3.438rem]">
        <Icon
          icon="fa-solid:search"
          className="text-grey left-2 absolute ml-4 text-xl pointer-events-none"
        />

        <input
          type="text"
          id="input-group-1"
          className="font-medium border-grey border pl-16 h-full flex-grow focus:ring-blue-500 focus:border-blue-500  text-grey text-sm rounded-lg  block w-full p-2.5  "
          placeholder="Search by name"
        />
      </div>

      <button
        onClick={() => dispatch(toggleAddModal())}
        className="bg-green cursor-pointer ml-auto text-sm font-bold w-full sm:w-[8.563rem] h-[3.438rem] rounded-xl shadow-buttonShadow text-white"
      >
        Add a photo
      </button>
      {addModalState && <AddModal />}
    </header>
  );
};

export default Header;
