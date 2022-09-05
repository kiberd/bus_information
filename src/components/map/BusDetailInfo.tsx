import React, { useEffect, useState } from "react";

import { RefreshIcon, ArrowLeftIcon } from "@heroicons/react/outline";

import { useRecoilState } from "recoil";
import { targetBusDataState } from "../../atoms/data";

import { useQuery } from "react-query";
import { getSttnAcctoArvlPrearngeInfoList } from "../../api/api";

import BusArrivalInfo from "./BusArrivalInfo";

import { BusArrivalInfoType } from "../../types/businfo";

import moment from "moment";

const BusDetailInfo = () => {
  const [targetBusData, setTargetBusData] = useRecoilState(targetBusDataState);
  const [filterArvlPrearngeData, setFilterArvlPrearngeData] =
    useState<BusArrivalInfoType[]>();

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
  }, [targetBusData]);

  useEffect(() => {
    if (arvlPrearngeData) {

      const initArry: BusArrivalInfoType[] = [];

      const filterArvlPrearngeData: BusArrivalInfoType[] =
        arvlPrearngeData?.items?.item?.reduce(
          (acc: any, obj: any) =>
            acc.some((ele: any) => ele.routeno === obj.routeno)
              ? acc
              : [...acc, obj],
          initArry
        );

      setFilterArvlPrearngeData(filterArvlPrearngeData);
    }
  }, [arvlPrearngeData]);

  if (isArvlPrearngeFetching)
    return (
      <div className="flex items-center justify-center h-full md:h-[90vh]">
        <div className="w-16 h-16 border-b-4 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );

  if (isArvlPrearngeError)
    return (
      <div className="flex items-center justify-center h-full md:h-[90vh]">
        <div>노선 정보를 불러올 수 없습니다.</div>
      </div>
    );

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 left-0 flex-col px-10 py-2 bg-white">
        <ArrowLeftIcon
          className="hidden w-4 h-4 mb-3 cursor-pointer md:block"
          onClick={() => setTargetBusData({ ...targetBusData, isList: true })}
        />

        <div className="flex items-start">
          <h2 className="text-xl font-bold">
            {targetBusData.nodeNm} ({targetBusData.nodeId})
          </h2>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-500">
            {moment().format("h:mm")} 기준
          </span>
          <RefreshIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => refetchAcctoArvlPrearngeInfoList()}
          />
        </div>
      </div>

      {arvlPrearngeData && arvlPrearngeData.totalCount === 0 ? (
        <div className="flex items-center justify-center h-[60vh] md:h-[90vh]">
          <div>도착 예정 버스가 없습니다.</div>
        </div>
      ) : null}

      
      {filterArvlPrearngeData &&
        filterArvlPrearngeData.map((arvlInfo: any, index: any) => (
          <BusArrivalInfo key={arvlInfo.nodeid + index} arvlInfo={arvlInfo} />
        ))}
      

    </div>
  );
};

export default BusDetailInfo;
