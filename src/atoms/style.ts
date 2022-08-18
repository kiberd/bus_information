import { atom } from "recoil";

const headerMenuState = atom({
	key: "headerMenuState",
	default: true,
});

export {
	headerMenuState,
};
