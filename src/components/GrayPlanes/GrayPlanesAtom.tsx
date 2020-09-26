import { atom } from "recoil";

export const grayPlanesPosYAtom = atom({
  key: "grayPlanesPosYAtom",
  default: 0,
});

export const grayPlanesRotYAtom = atom({
  key: "grayPlanesRotYAtom",
  default: 0,
});

export const grayPlanesVisibleAtom = atom({
  key: "grayPlanesVisibleAtom",
  default: false,
});