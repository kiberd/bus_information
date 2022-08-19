import React from "react";

interface BusArrivalInfoProps {
    arvlInfo: BusArrivalInfoType;
}

interface BusArrivalInfoType {
  arrprevstationcnt: number;
  arrtime: number;
  nodeid: string;
  nodenm: string;
  routeid: string;
  routeno: number;
  routetp: string;
  vehicletp: string;
}

const BusArrivalInfo: React.FC<BusArrivalInfoProps> = ({ arvlInfo }) => {
  return (
    <div className="flex justify-between ml-5 border-y border-gray-200 py-6 px-6">
      <div className="flex">
        <img
          src={process.env.PUBLIC_URL + "/bus.png"}
          className="w-8 h-8 mt-2"
        />

        <div className="ml-4">
          <div className="text-lg">{arvlInfo.routeno}</div>
          <div className="text-sm">
            <span className="text-red-600">{Math.ceil(arvlInfo.arrtime / 60)}분</span>   {arvlInfo.arrprevstationcnt}정류장
          </div>
        </div>
      </div>

      {/* <div className="text-gray-400 text-xs">군자역 성수역</div> */}
    </div>
  );
};

export default BusArrivalInfo;
