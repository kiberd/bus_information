import React, { useEffect, useState } from "react";
import { BusArrivalInfoType } from "../../types/businfo";

interface BusArrivalInfoProps {
  arvlInfo: BusArrivalInfoType;
}

const BusArrivalInfo: React.FC<BusArrivalInfoProps> = ({ arvlInfo }) => {

  const [busColor, setBusColor] = useState<string>();

  useEffect(() => {
    if (arvlInfo) {
      switch (arvlInfo.routetp) {
        case "마을버스":
          setBusColor("yellow");
          break;
        case "일반버스":
          setBusColor("green");
          break;
        case "광역급행버스":
          setBusColor("red");
          break;
        case "직행좌석버스":
          setBusColor("red");
          break;

        default:
          break;
      }
    }
  }, [arvlInfo]);

  return (
    <div className="flex justify-between px-6 py-6 mx-5 border-b border-gray-200 md:ml-5">
      <div className="flex">
        {/* <img
          src={process.env.PUBLIC_URL + "/bus.png"}
          className="w-8 h-8 mt-2 text-red-500"
        /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 453.543 453.543"
          overflow="visible"
          enable-background="new 0 0 40 40"
          fill={busColor}
          className="mt-1"
        >
          <g id="Bus">
            <path d="M367.524,92.122c-4.208-21.045-17.678-29.463-37.882-37.882c-19.918-8.299-67.648-18.229-102.872-18.507      C191.548,36.012,143.819,45.941,123.9,54.24c-20.204,8.418-33.673,16.836-37.882,37.882L70.866,208.794V369.56h26.096v25.211      c0,30.739,44.984,30.739,44.984,0V369.56h83.048h0.263h86.341v25.211c0,30.739,44.983,30.739,44.983,0V369.56h26.096V208.794      L367.524,92.122z M162.625,65.184h62.631h65.662c12.628,0,12.628,18.941,0,18.941h-65.815h-62.478      C149.997,84.125,149.997,65.184,162.625,65.184z M119.472,319.162c-11.918,0-21.58-9.662-21.58-21.58s9.662-21.579,21.58-21.579      s21.58,9.661,21.58,21.579S131.39,319.162,119.472,319.162z M225.256,221.09H110.797c-11.206,0-13.552-8.051-12.452-16.162      l11.793-84.621c1.62-10.281,5.105-17.059,18.444-17.059h96.521h99.857c13.34,0,16.824,6.778,18.443,17.059l11.795,84.621      c1.1,8.111-1.246,16.162-12.452,16.162H225.256z M334.07,319.162c-11.918,0-21.579-9.662-21.579-21.58      s9.661-21.579,21.579-21.579s21.579,9.661,21.579,21.579S345.988,319.162,334.07,319.162z" />
          </g>
        </svg>

        <div className="ml-4">
          <div className="text-lg">{arvlInfo.routeno}</div>
          <div className="text-sm">
            <span className="text-red-600">
              {Math.ceil(arvlInfo.arrtime / 60)}분
            </span>{" "}
            {arvlInfo.arrprevstationcnt}정류장
          </div>
        </div>
      </div>

      {/* <div className="text-xs text-gray-400">군자역 성수역</div> */}
    </div>
  );
};

export default BusArrivalInfo;
