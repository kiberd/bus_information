import React, { useEffect } from "react";

import { RefreshIcon } from "@heroicons/react/outline";

import { useRecoilState } from "recoil";
import { targetBusDataState } from "../../atoms/data";

import { useQuery } from "react-query";
import { getSttnAcctoArvlPrearngeInfoList } from "../../api/api";

import BusArrivalInfo from "./BusArrivalInfo";

const BusDetailInfo = () => {
  const [targetBusData, setTargetBusData] = useRecoilState(targetBusDataState);

  const {
    data: arvlPrearngeData,
    isLoading: isArvlPrearngeLoading,
    isError: isArvlPrearngeError,
    isFetching: isArvlPrearngeFetching,
    refetch: refetchAcctoArvlPrearngeInfoList,
  } = useQuery(
    "getSttnAcctoArvlPrearngeInfoList",
    () =>
      getSttnAcctoArvlPrearngeInfoList(
        targetBusData.nodeId,
        targetBusData.cityCode
      ),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (targetBusData) refetchAcctoArvlPrearngeInfoList();

    // console.log(targetBusData);
  }, [targetBusData]);

  useEffect(() => {
    console.log(arvlPrearngeData);
  }, [arvlPrearngeData]);

  // useEffect(() => {
  //   console.log(targetBusData);
  // }, [targetBusData])

  if (isArvlPrearngeFetching)
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <div className="w-16 h-16 border-b-4 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );

  if (isArvlPrearngeError)
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <div>노선 정보를 불러올 수 없습니다.</div>
      </div>
    );

  return (
    <div>
      {/* Header */}
      <div className="flex-col w-full px-10 mb-4">
        <div className="flex items-start">
          <h2 className="text-xl font-bold">
            {targetBusData.nodeNm} ({targetBusData.nodeId})
          </h2>
        </div>

        <div className="flex items-center justify-end">
          <span className="text-gray-500 text-sm">17:05 기준 </span>
          <RefreshIcon className="w-5 h-5 ml-4 cursor-pointer" onClick={() => refetchAcctoArvlPrearngeInfoList()} />
        </div>
      </div>

      {arvlPrearngeData && arvlPrearngeData.totalCount === 0 ? (
        <div className="flex items-center justify-center h-[90vh]">
          <div>도착 예정 버스가 없습니다.</div>
        </div>
      ) : null}

      {arvlPrearngeData &&
        arvlPrearngeData.items?.item?.map((arvlInfo: any) => (
          <BusArrivalInfo arvlInfo={arvlInfo} />
        ))}
    </div>
  );
};

export default BusDetailInfo;
