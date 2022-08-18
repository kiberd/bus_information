import React from "react";

import { RefreshIcon } from "@heroicons/react/outline";

const BusDetailInfo = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between w-full min-h-[4vh] px-10 mt-5 mb-7">
        <div className="flex items-start">
          <h2 className=" text-xl font-bold">군자역</h2>
        </div>

        <div className="flex items-end">
          <span className="text-gray-500 text-sm">17:05 기준 </span>
          <RefreshIcon className="w-5 h-5 ml-4" />
        </div>
      </div>






      {/* Contents */}
      <div className="flex justify-between ml-5 border-y border-gray-200 py-6 px-6">
        <div className="flex">
          {/* Logo */}
          <img src={process.env.PUBLIC_URL + "/bus.png"} className="w-8 h-8 mt-2" />

          {/* Info */}
          <div className="ml-4">
            <div className="text-lg">604</div>
            <div className="text-sm"><span className="text-red-600">6분</span> 4정류장</div>
          </div>
        </div>

        <div className="text-gray-400 text-xs">군자역  성수역</div>
      </div>



      <div className="flex justify-between ml-5 border-y border-gray-200 py-6 px-6">
        <div className="flex">
          {/* Logo */}
          <img src={process.env.PUBLIC_URL + "/bus.png"} className="w-8 h-8 mt-2" />

          {/* Info */}
          <div className="ml-4">
            <div className="text-lg">604</div>
            <div className="text-sm"><span className="text-red-600">6분</span> 4정류장</div>
          </div>
        </div>

        <div className="text-gray-400 text-xs">군자역  성수역</div>
      </div>

      <div className="flex justify-between ml-5 border-y border-gray-200 py-6 px-6">
        <div className="flex">
          {/* Logo */}
          <img src={process.env.PUBLIC_URL + "/bus.png"} className="w-8 h-8 mt-2" />

          {/* Info */}
          <div className="ml-4">
            <div className="text-lg">604</div>
            <div className="text-sm"><span className="text-red-600">6분</span> 4정류장</div>
          </div>
        </div>

        <div className="text-gray-400 text-xs">군자역  성수역</div>
      </div>


    </div>
  );
};

export default BusDetailInfo;
