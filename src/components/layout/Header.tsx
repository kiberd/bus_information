import React, { useEffect, useState } from "react";
import { CubeTransparentIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

import { headerMenuState } from "../../atoms/style";
import { useRecoilState } from "recoil";

const Header = () => {

  const [isMap, setIsMap] = useRecoilState(headerMenuState);
 
  return (
    <div className="fixed left-0 top-0 w-full h-[70px] bg-gray-200 flex">
      <div className="flex items-center w-[70%] h-full">
        <div className="ml-5 flex">
          <CubeTransparentIcon className="w-6 h-6" />
          <h3 className="ml-5">Bus Information</h3>
        </div>

        {/* <nav>
          <ul className="flex ml-6">
            <li className={ isMap ? `ml-6 transition duration-700 border-b border-gray-700 text-black` : `ml-6`} onClick={() => setIsMap(true)}>
              <Link to={"/"}>지도로 보기</Link>
            </li>
            <li className={ isMap ? `ml-6` : `border-b border-gray-700 text-black ml-6`} onClick={() => setIsMap(false)}>
              <Link to={"/list"}>목록으로 보기</Link>
            </li>
          </ul>
        </nav> */}

      </div>

      {/* <div className="flex items-center justify-center w-[30%] h-full bg-green-400">
        Menu
      </div> */}
    </div>
  );
};

export default Header;
