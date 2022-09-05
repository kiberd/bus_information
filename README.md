# 위치기반 전국 버스 정류장 조회 및 버스 도착 정보 조회 사이트

https://bus-information.vercel.app

## 사용 api

- 국토교통부_(TAGO)_버스정류소정보
- 국토교통부_(TAGO)_버스도착정보
- kakao 주소검색

## Stack

- React.js
- Tailwind css
- Recoil
- Axios
- React-query
- React-kakao-maps-sdk

## Usage

- 맵 정중앙에 있는 마커를 클릭하면 반경 500미터 버스정류장을 조회
- 버스정류장 클릭하면 해당 정류장 버스 도착 정보 조회
- 맵 마커 이동방법 : 직접 drag 혹은 주소란에 입력한 주소 클릭


## Issue

- 공공데이터 api 속도 문제 : 사용량이 많은 낮 시간대에는 현저하게 속도가 느림 -> 대체 api 검색 필요

## 추가 예정 기능

- 버스 노선도 map 에 표시하기



