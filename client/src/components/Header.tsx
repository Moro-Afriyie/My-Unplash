import * as React from "react";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <header className="flex justify-between w-full items-center font-noto-sans">
      <h1>Header</h1>
      <button className="bg-green text-sm font-bold w-[8.563rem] h-[3.438rem] rounded-xl shadow-buttonShadow text-white">
        Add a photo
      </button>
    </header>
  );
};

export default Header;
