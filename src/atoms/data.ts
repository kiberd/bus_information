import { atom } from "recoil";

export interface TargetBusDataTypes {
    isSttnFetching: boolean;
    isList: boolean;
    sttnList: any[];
    nodeId: string;
    nodeNm: string;
    cityCode: number;
  }


const targetBusDataState = atom<TargetBusDataTypes>({
	key: "targetBusDataState",
	default: {
        isSttnFetching: false,
        isList: true,
        sttnList: [],
        nodeId: "",
        nodeNm: "",
        cityCode: 0
    },
});

const centerCoordinateState = atom({
  key: "centerCoordinateState",
  default: {
    x: "",
    y: ""
  }
})

export {
	targetBusDataState,
  centerCoordinateState,
};
