import { atom } from "recoil";

const headerMenuState = atom({
  key: "headerMenuState",
  default: true,
});

const busInfoModalState = atom({
  key: "busInfoModalState",
  default: false,
});

export { headerMenuState, busInfoModalState };
