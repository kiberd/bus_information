import React, { useState, useRef, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";

import { useQuery } from "react-query";

import { getCrdntPrxmtSttnList} from "../../api/api";



const BusMap = () => {
  const mapRef: any = useRef();
  const [info, setInfo] = useState<any>();

  const [marker, setMarker] = useState<any>();
  const [sttnList, setSttnList] = useState<any[]>([]);

  const {
    data: sttnData,
    isLoading: sttnLoading,
    isError: sttnError,
    isFetching: sttnFetching,
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
    })
  } ,[])

  useEffect(() => {
    if (marker && !sttnFetching) refetchCrdntPrxmtSttnList();
  }, [marker]);

  useEffect(() => {
    if (sttnData) setSttnList([...sttnData.items.item]);
  }, [sttnData]);

  return (
    <div>
      <Map
        center={{ lat: 37.67076, lng: 126.760211 }}
        style={{ width: "100%", height: "calc(100vh - 90px)" }}
        level={3} // 지도의 확대 레벨
        onDragEnd={(map) =>
          setMarker({
            level: map.getLevel(),
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          })
        }
        onZoomChanged={(map) => setMarker({ ...marker, level: map.getLevel() })}
        ref={mapRef}
      >
        {marker ? (
          sttnFetching ? (
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
              <div className="p-2 bg-slate-300 border-gray-400 rounded-md flex justify-around items-center w-[120px]">
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
