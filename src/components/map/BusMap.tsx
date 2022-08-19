import React, { useState, useRef, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

import { useQuery } from "react-query";

import { getCrdntPrxmtSttnList } from "../../api/api";

import { useRecoilState } from "recoil";
import { targetBusDataState } from "../../atoms/data";

const BusMap = () => {
  const [targetBusData, setTargetBusData] = useRecoilState(targetBusDataState);

  const mapRef: any = useRef();
  const [marker, setMarker] = useState<any>();
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

  useEffect(() => {
    setMarker({
      level: 3,
      lat: 37.67076,
      lng: 126.760211,
    });
  }, []);

  useEffect(() => {
    if (marker && !isSttnFetching) {
      refetchCrdntPrxmtSttnList();
      setTargetBusData({...targetBusData, isSttnFetching: true});
    }
  }, [marker]);

  useEffect(() => {
    if (sttnData) {
      setSttnList([...sttnData.items.item]);
      setTargetBusData({
        ...targetBusData,
        sttnList: [...sttnData.items.item],
        isSttnFetching: false
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
  };

  return (
    <div>
      <Map
        center={{ lat: 37.67076, lng: 126.760211 }}
        style={{ width: "100%", height: "calc(100vh - 90px)" }}
        level={3}
        onDragEnd={(map) => {
          setMarker({
            level: map.getLevel(),
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          });

          setTargetBusData({ ...targetBusData, isList: true});
        }}
        onZoomChanged={(map) => {
          setMarker({ ...marker, level: map.getLevel() });
          setTargetBusData({ ...targetBusData, isList: true});
        }}
        ref={mapRef}
      >
        {marker ? (
          isSttnFetching ? (
            <CustomOverlayMap position={{ lat: marker.lat, lng: marker.lng }}>
              <div className="flex items-center justify-center ">
                <div className="w-16 h-16 border-b-4 border-gray-900 rounded-full animate-spin"></div>
              </div>
            </CustomOverlayMap>
          ) : (
            <MapMarker position={{ lat: marker.lat, lng: marker.lng }} />
          )
        ) : null}

        {sttnList &&
          marker?.level < 4 &&
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

                <div className="text-xs text-ellipsis overflow-hidden">
                  {sttn.nodenm}
                </div>
              </div>
            </CustomOverlayMap>
          ))}
      </Map>
    </div>
  );
};

export default BusMap;
