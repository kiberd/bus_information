import React, { useEffect, useState } from "react";
import BusStationInfo from "./BusStationInfo";
import BusDetailInfo from "./BusDetailInfo";

import { ArrowLeftIcon } from "@heroicons/react/outline";

import { useRecoilState } from "recoil";
import { targetBusDataState } from "../../atoms/data";

const BusListContainer = () => {
  const [targetBusData, setTargetBusData] = useRecoilState(targetBusDataState);

  if (!targetBusData.isSttnFetching && targetBusData.sttnList.length === 0)
    return (
      <div className="items-center justify-center hidden ml-40 md:flex">
        <div>버스 정류장 정보가 없습니다.</div>
      </div>
    );

  return (
    <div className="hidden md:block w-[30%] ml-2 border-l mt-2  border-gray-300 h-[90vh] overflow-auto">
      {targetBusData.isList ? (
        targetBusData.isSttnFetching ? (
          <div className="flex items-center justify-center h-[90vh]">
            <div className="w-16 h-16 border-b-4 border-gray-900 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="cursor-pointer">
            {targetBusData.sttnList.map((sttn) => (
              <div
                onClick={() =>
                  setTargetBusData({
                    ...targetBusData,
                    isList: false,
                    nodeId: sttn.nodeid,
                    nodeNm: sttn.nodenm,
                    cityCode: sttn.citycode,
                  })
                }
              >
                <BusStationInfo nodeid={sttn.nodeid} nodenm={sttn.nodenm} />
              </div>
            ))}
          </div>
        )
      ) : (
        <div>
          {/* <ArrowLeftIcon
            className="w-5 h-5 mt-4 mb-4 ml-4 cursor-pointer"
            onClick={() => setTargetBusData({ ...targetBusData, isList: true })}
          /> */}
          <BusDetailInfo />
        </div>
      )}
    </div>
  );
};

export default BusListContainer;
