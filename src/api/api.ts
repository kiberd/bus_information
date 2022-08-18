import axios from "axios";

export const getCrdntPrxmtSttnList = async (
  gpsLati: number,
  gpsLong: number
) => {
  const { data } = await axios.get(
    // `http://apis.data.go.kr/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList`,
    `/1613000/BusSttnInfoInqireService/getCrdntPrxmtSttnList`,
    {
      params: {
        serviceKey: process.env.REACT_APP_SERVICE_KEY,
        pageNo: 1,
        numOfRows: 10,
        _type: "json",
        gpsLati: gpsLati,
        gpsLong: gpsLong,
      },
    }
  );

  return data.response.body;
};
