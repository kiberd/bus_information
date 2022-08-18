import React, { useState } from "react";
import BusStationInfo from "./BusStationInfo";
import BusDetailInfo from "./BusDetailInfo";

import { ArrowLeftIcon } from "@heroicons/react/outline";

const BusListContainer = () => {
  const [isStationInfo, setIsStationInfo] = useState(false);

  return (
    <div className="w-[30%] ml-2 border-l border-gray-300">
      {isStationInfo ? (
        <div
          className=" cursor-pointer"
          onClick={() => setIsStationInfo(false)}
        >
          <BusStationInfo />
          <BusStationInfo />
          <BusStationInfo />
          <BusStationInfo />
          <BusStationInfo />
          <BusStationInfo />
          <BusStationInfo />
        </div>
      ) : (
        <div>
          <ArrowLeftIcon
            className="w-5 h-5 ml-4 mt-4 cursor-pointer"
            onClick={() => setIsStationInfo(true)}
          />
          <BusDetailInfo />
        </div>
      )}
    </div>
  );
};

export default BusListContainer;
