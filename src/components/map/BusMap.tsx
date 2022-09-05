import React, { useState, useRef, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

import { useQuery } from "react-query";

import {
  getCrdntPrxmtSttnList,
  getCtyCodeList,
  getAddressByQuery,
} from "../../api/api";

import { useRecoilState } from "recoil";
import { targetBusDataState, centerCoordinateState } from "../../atoms/data";

import BusInfoModal from "./BusInfoModal";

import { GlobeAltIcon } from "@heroicons/react/solid";

const BusMap = () => {
  const [targetBusData, setTargetBusData] = useRecoilState(targetBusDataState);
  const [isBusInfoModalOpen, setIsBusInfoModalOpen] = useState<boolean>(false);
  const [centerCoordinate, setCenterCoordinate] = useRecoilState(centerCoordinateState);

  useEffect(() => {
    if (centerCoordinate.x !== "" && centerCoordinate.y !== "") setMarker({ ...marker, lat: centerCoordinate.y, lng: centerCoordinate.x });
  }, [centerCoordinate])

  const mapRef: any = useRef();
  const [level, setLevel] = useState<any>(3);
  const [marker, setMarker] = useState<any>({
    level: 3,
    lat: 37.67076,
    lng: 126.760211,
  });
  const [sttnList, setSttnList] = useState<any[]>([]);

  const {
    data: sttnData,
    isLoading: sttnLoading,
    isError: sttnError,
    isFetching: isSttnFetching,
    refetch: refetchCrdntPrxmtSttnList,
  } = useQuery(
    "getCrdntPrxmtSttnList",
    () => getCrdntPrxmtSttnList(marker.lat, marker.lng),
    {
      enabled: false,
    }
  );

  const handleMarkerClick = () => {
    if (marker && !isSttnFetching) {
      refetchCrdntPrxmtSttnList();
      setTargetBusData({
        ...targetBusData,
        isSttnFetching: true,
        isList: true,
      });
    }
  };

  useEffect(() => {
    if (sttnData) {
      let targetSttnList: any;
      if (sttnData.items === "") {
        targetSttnList = [];
      } else {
        targetSttnList = [...sttnData.items.item];
      }

      setSttnList(targetSttnList);
      setTargetBusData({
        ...targetBusData,
        sttnList: targetSttnList,
        isSttnFetching: false,
      });
    }
  }, [sttnData]);

  const handleTargetBusData = (
    nodeId: string,
    nodeNm: string,
    cityCode: number
  ) => {
    setTargetBusData({
      ...targetBusData,
      isList: false,
      nodeId: nodeId,
      nodeNm: nodeNm,
      cityCode: cityCode,
    });
    handleBusInfoModal(true);
  };

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setMarker({ ...marker, lat: lat, lng: lon });
      });
    } else {
      alert("no geolocation");
    }
  };

  const handleBusInfoModal = (open: boolean) => {
    setIsBusInfoModalOpen(open);
  };

  return (
    <div>
      <Map
        center={{ lat: marker.lat, lng: marker.lng }}
        isPanto={true}
        level={3}
        onDragEnd={(map) => {
          setMarker({
            level: map.getLevel(),
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          });
        }}
        onZoomChanged={(map) => {
          setLevel(map.getLevel());
        }}
        ref={mapRef}
        className="w-full h-[calc(100vh_-_90px)]"
      >
        {marker ? (
          isSttnFetching ? (
            <CustomOverlayMap position={{ lat: marker.lat, lng: marker.lng }}>
              <div className="flex items-center justify-center ">
                <div className="w-16 h-16 border-b-4 border-gray-900 rounded-full animate-spin"></div>
              </div>
            </CustomOverlayMap>
          ) : (
            <>
              <MapMarker
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={handleMarkerClick}
              />
            </>
          )
        ) : null}

        {sttnList &&
          level &&
          level < 5 &&
          sttnList.map((sttn, index) => (
            <CustomOverlayMap
              key={index}
              position={{ lat: sttn.gpslati, lng: sttn.gpslong }}
            >
              <div
                className={
                  targetBusData.cityCode === sttn.citycode &&
                  targetBusData.nodeId === sttn.nodeid
                    ? `bg-slate-300 p-2 border-gray-800 rounded-md flex justify-around items-center w-[120px]`
                    : `bg-white p-2 border-gray-800 rounded-md flex justify-around items-center w-[120px]`
                }
                onClick={(e) =>
                  handleTargetBusData(sttn.nodeid, sttn.nodenm, sttn.citycode)
                }
              >
                <img
                  src={process.env.PUBLIC_URL + "/bus.png"}
                  className="w-4 h-4"
                />

                <div className="overflow-hidden text-xs text-ellipsis">
                  {sttn.nodenm}
                </div>
              </div>
            </CustomOverlayMap>
          ))}
      </Map>

      {isBusInfoModalOpen ? (
        <BusInfoModal
          isBusInfoModalOpen={isBusInfoModalOpen}
          onHandleBusInfoModal={handleBusInfoModal}
        />
      ) : null}

      {/* Mobile */}
      <div className="md:hidden fixed top-[85px] left-0 right-0 my-0 mx-[5vw] z-[5] p-3 text-xs border rounded-md bg-slate-100 text-center">
        검색하시려면 가운데 마커를 클릭 해주세요. (반경 500m 검색)
      </div>

      {/* PC */}
      <div className="hidden md:block fixed top-[85px] left-[20px] z-[5] p-3 text-xs border rounded-md bg-slate-100 text-center">
        검색하시려면 가운데 마커를 클릭 해주세요. (반경 500m 검색)
      </div>

      <div
        onClick={handleCurrentLocationClick}
        className="hidden md:block fixed z-10 p-3 text-xs border rounded-md md:text-sm bottom-[3vh] left-[65vw] bg-slate-100 cursor-pointer"
      >
        <GlobeAltIcon className="w-5 h-5" />
      </div>

      <div
        onClick={handleCurrentLocationClick}
        className="md:hidden fixed z-10 p-3 text-xs border rounded-md md:text-sm bottom-[3vh] right-[4vw] bg-slate-100 cursor-pointer"
      >
        <GlobeAltIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default BusMap;
