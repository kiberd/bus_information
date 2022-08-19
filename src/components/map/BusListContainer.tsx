import React, { useEffect, useState } from "react";
import BusStationInfo from "./BusStationInfo";
import BusDetailInfo from "./BusDetailInfo";

import { ArrowLeftIcon } from "@heroicons/react/outline";

import { useRecoilState } from "recoil";
import { targetBusDataState } from "../../atoms/data";

const BusListContainer = () => {
  const [targetBusData, setTargetBusData] = useRecoilState(targetBusDataState);

  // useEffect(() => {
  //   console.log(targetBusData);
  // }, [targetBusData]);

  // if (targetBusData.isSttnFetching) return (
  //   <div className="flex justify-center items-center">
  //     <div className="w-16 h-16 border-b-4 border-gray-900 rounded-full animate-spin"></div>
  //   </div>

  // )

  // useEffect(() => {
  //   console.log(targetBusData);
  // } ,[targetBusData])

  // if (targetBusData.isSttnFetching)
  //   return (
  //     <div className="flex items-center">
  //       <div className="w-16 h-16 border-b-4 border-gray-900 rounded-full animate-spin"></div>
  //     </div>
  //   );

  return (
    <div className="w-[30%] ml-2 border-l border-gray-300 h-[90vh] overflow-auto">
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
          <ArrowLeftIcon
            className="w-5 h-5 ml-4 mt-4 mb-4 cursor-pointer"
            onClick={() => setTargetBusData({ ...targetBusData, isList: true })}
          />
          <BusDetailInfo />
        </div>
      )}
    </div>
  );
};

export default BusListContainer;
