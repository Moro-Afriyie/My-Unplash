import * as React from "react";
import logo from "../assets/my_unsplash_logo.svg";
import { Icon } from "@iconify/react";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <header className="flex justify-between w-full items-center font-noto-sans">
      <div className="flex gap-4">
        <img src={logo} alt="logo" />
        <div className="w-[18.75rem] overflow-hidden  rounded-lg relative flex gap-3 items-center justify-center h-[3.438rem]">
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
      </div>
      <button className="bg-green text-sm font-bold w-[8.563rem] h-[3.438rem] rounded-xl shadow-buttonShadow text-white">
        Add a photo
      </button>
    </header>
  );
};

export default Header;
