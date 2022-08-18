import React, { useState, useRef, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import { useQuery } from "react-query";

import { getCrdntPrxmtSttnList } from "../../api/api";



const BusMap = () => {
  const mapRef: any = useRef();
  const [info, setInfo] = useState<any>();


  const {
		data: sttnData,
    refetch: refetchCrdntPrxmtSttnList,
	} = useQuery("getCrdntPrxmtSttnList", () => getCrdntPrxmtSttnList(info.center.lat, info.center.lng), {
		enabled: false,
	});

  useEffect(() => {
    if (info) refetchCrdntPrxmtSttnList();
  } ,[info]);

  useEffect(() => {
    console.log(sttnData);
  } ,[sttnData])



  return (
    <div>
      <Map
        center={{ lat: 37.531, lng: 126.986 }}
        style={{ width: "100%", height: "calc(100vh - 90px)"}}
        // style={{ width: "100%", height: "500px" }}
        ref={mapRef}
      >
        <MapMarker position={{ lat: 37.531, lng: 126.986 }}>
          {/* <div style={{ color: "#000" }}>Hello World!</div> */}
        </MapMarker>
      </Map>

      {/* <button
        onClick={() => {
          const map = mapRef.current;
          setInfo({
            center: {
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            },
            level: map.getLevel(),
            typeId: map.getMapTypeId(),
            swLatLng: {
              lat: map.getBounds().getSouthWest().getLat(),
              lng: map.getBounds().getSouthWest().getLng(),
            },
            neLatLng: {
              lat: map.getBounds().getNorthEast().getLat(),
              lng: map.getBounds().getNorthEast().getLng(),
            },
          });
        }}
      >
        정보 가져 오기!
      </button>
      {info && (
        <div>
          <p>위도 : {info.center.lat}</p>
          <p>경도 : {info.center.lng}</p>
          <p>레벨 : {info.level}</p>
          <p>타입 : {info.typeId}</p>
          <p>
            남서쪽 좌표 : {info.swLatLng.lat}, {info.swLatLng.lng}
          </p>
          <p>
            북동쪽 좌표 : {info.neLatLng.lat}, {info.neLatLng.lng}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default BusMap;
