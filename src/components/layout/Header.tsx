import React, { useEffect, useState } from "react";
import { CubeTransparentIcon } from "@heroicons/react/outline";

import useQueryDebounce from "../../hooks/useQueryDebounce";
import useSearch from "../../hooks/useSearch";
import { XIcon } from "@heroicons/react/solid";

import AddressList from "../list/ AddressList";

const Header = () => {
  const [address, setAddress] = useState<any>();
  const [isVisible, setIsVisible] = useState<boolean>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const debouncedSearchInput = useQueryDebounce(address, 500);

  const { data, isLoading, isFetching, isError } =
    useSearch(debouncedSearchInput);

  useEffect(() => {
    setIsVisible(true);
  }, [data]);

  return (
    <div className="fixed left-0 top-0 w-full h-[70px] bg-gray-200 z-10">
      <div className="flex w-full h-full">
        <div className="w-[55%] flex justify-center md:justify-start items-center">
          <CubeTransparentIcon className="w-4 h-5 ml-4" />
          <h2 className="ml-2">Bus Information</h2>

          {/* PC용 input */}
          <div className="relative flex-col hidden ml-10 md:block">
            <label className="ml-1 text-xs">주소를 입력하세요</label>

            <div className="flex">
              <input
                className="px-1 border border-gray-500 rounded-md"
                onChange={handleInputChange}
              />
            </div>

            {/* 검색 결과 */}
            {isVisible && data && data.length > 0 ? (
              <div className="absolute z-[20] bg-white border border-gray-500 rounded-md mt-2">
                <XIcon
                  className="mt-2 ml-2 cursor-pointer"
                  width={15}
                  height={15}
                  onClick={() => setIsVisible(false)}
                >
                  close
                </XIcon>
                <AddressList data={data} />
              </div>
            ) : null}
          </div>
        </div>

        <div className="w-[45%] flex justify-center items-center">
          {/* Mobile용 input */}
          <div className="flex-col w-full md:hidden">
            <label className="ml-1 text-xs">주소를 입력하세요</label>
            <div className="flex">
              <input
                className="w-full mr-2 border border-gray-500 rounded-md"
                onChange={handleInputChange}
              />
            </div>

            {/* 검색 결과 */}
            {isVisible && data && data.length > 0 ? (
              <div className="absolute z-[20] bg-white border border-gray-500 rounded-md mt-2 left-0 right-0 my-0 mx-[20px]">
                <XIcon
                  className="mt-2 ml-2 cursor-pointer"
                  width={15}
                  height={15}
                  onClick={() => setIsVisible(false)}
                >
                  close
                </XIcon>
                <AddressList data={data} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
