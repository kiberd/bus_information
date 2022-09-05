import axios from "axios";

export const getAddressByQuery = async (query: string) => {
  const { data } = await axios.get(
    process.env.REACT_APP_KAKAO_END_POINT + `/v2/local/search/address.json`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
      },
      params: {
        query: query,
        analyze_type: "similar",
      },
    }
  );

  return data.documents;
};

export const getCrdntPrxmtSttnList = async (
  gpsLati: number,
  gpsLong: number
) => {
  const { data } = await axios.get(
    // `http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList`,
    process.env.REACT_APP_END_POINT +
      `/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList`,
    {
      params: {
        serviceKey: process.env.REACT_APP_SERVICE_KEY,
        pageNo: 1,
        numOfRows: 100,
        _type: "json",
        gpsLati: gpsLati,
        gpsLong: gpsLong,
      },
    }
  );

  return data.response.body;
};

export const getCtyCodeList = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_END_POINT +
      `/1613000/BusSttnInfoInqireService/getCtyCodeList`,
    {
      params: {
        serviceKey: process.env.REACT_APP_SERVICE_KEY,
        _type: "json",
      },
    }
  );

  return data.response.body;
};

export const getSttnAcctoArvlPrearngeInfoList = async (
  nodeId: string,
  cityCode: number
) => {
  const { data } = await axios.get(
    // `http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList`,
    process.env.REACT_APP_END_POINT +
      `/1613000/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList`,
    {
      params: {
        serviceKey: process.env.REACT_APP_SERVICE_KEY,
        pageNo: 1,
        numOfRows: 100,
        _type: "json",
        nodeId: nodeId,
        cityCode: cityCode,
      },
    }
  );

  return data.response.body;
};

export const getInfoCtyCodeList = async () => {
  const { data } = await axios.get(
    process.env.REACT_APP_END_POINT +
      `/1613000/ArvlInfoInqireService/getCtyCodeList`,
    {
      params: {
        serviceKey: process.env.REACT_APP_SERVICE_KEY,
        _type: "json",
      },
    }
  );

  return data.response.body;
};
