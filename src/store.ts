import create from "zustand";

type BlueOrbState = {
  blueOrbId: string;
  hudId: string;
  hudActive: number;
  hudVisible: boolean;
  isActiveBlueOrbInteractedWith: boolean;
  yellowHudText: string;
  yellowHudTextPosY: number;
  yellowHudTextPosX: number;
  yellowHudTextOffsetXCoeff: number;
  activeBlueOrbPosX: number;
  activeBlueOrbPosZ: number;
  activeBlueOrbRotZ: number;
  setActiveBlueOrbPosX: (to: number) => void;
  setActiveBlueOrbPosZ: (to: number) => void;
  setActiveBlueOrbRotZ: (to: number) => void;
  setActiveBlueOrbId: (to: string) => void;
  setActiveBlueOrbHudId: (to: string) => void;
  toggleHud: () => void;
  setIsActiveBlueOrbInteractedWith: (to: boolean) => void;
  setYellowHudText: (to: string) => void;
  incrementYellowHudTextPosY: (by: number) => void;
  setYellowHudTextPosY: (to: number) => void;
  setYellowHudTextPosX: (to: number) => void;
  setYellowHudTextOffsetXCoeff: (to: number) => void;
};

type LainState = {
  lainMoveState: string;
  setLainMoveState: (to: string) => void;
};

type MainGroupState = {
  mainGroupPosY: number;
  mainGroupPosZ: number;
  mainGroupRotX: number;
  setMainGroupPosY: (to: number) => void;
  setMainGroupPosZ: (to: number) => void;
  setMainGroupRotX: (to: number) => void;
};

type GrayPlanesState = {
  grayPlanesVisible: boolean;
  setGrayPlanesVisible: (to: boolean) => void;
};

type StarfieldState = {
  introStarfieldVisible: boolean;
  mainStarfieldVisible: boolean;
  mainStarfieldBoostVal: number;
  setIntroStarfieldVisible: (to: boolean) => void;
  setMainStarfieldVisible: (to: boolean) => void;
  setMainStarfieldBoostVal: (to: number) => void;
};

type YellowOrbState = {
  yellowOrbVisible: boolean;
  setYellowOrbVisible: (to: boolean) => void;
};

type SiteState = {
  siteRotY: number;
  sitePosY: number;
  isSiteChangingY: boolean;
  incrementSiteRotY: (by: number) => void;
  incrementSitePosY: (by: number) => void;
  setSiteRotY: (to: number) => void;
  setSitePosY: (to: number) => void;
  setIsSiteChanging: (to: boolean) => void;
};

type LevelState = {
  activeLevels: string[];
  setActiveLevels: (to: string[]) => void;
};

type MiddleRingState = {
  middleRingWobbleStrength: number;
  middleRingRotating: boolean;
  middleRingNoise: number;
  middleRingPosY: number;
  middleRingRotX: number;
  middleRingRotZ: number;
  middleRingAnimDuration: number;
  setMiddleRingWobbleStrength: (to: number) => void;
  setMiddleRingRotating: (to: boolean) => void;
  setMiddleRingNoise: (to: number) => void;
  addToMiddleRingPosY: (val: number) => void;
  setMiddleRingPosY: (to: number) => void;
  setMiddleRingRotX: (to: number) => void;
  setMiddleRingRotZ: (to: number) => void;
  setMiddleRingAnimDuration: (to: number) => void;
};

type MediaState = {
  activeMediaElement: string;
  activeLeftColElementIdx: number;
  activeLeftColElement: { text: string; position: number[] };
  leftColElements: { text: string; position: number[] }[];
  toggleLeftColActiveElement: () => void;
};

export const useBlueOrbStore = create<BlueOrbState>((set) => ({
  blueOrbId: "0422",
  hudId: "fg_hud_1",
  hudActive: 1,
  isActiveBlueOrbInteractedWith: false,
  hudVisible: true,
  yellowHudText: "Tda028",
  yellowHudTextPosY: 0.23,
  yellowHudTextPosX: -0.35,
  yellowHudTextOffsetXCoeff: 0,
  activeBlueOrbPosX: 0,
  activeBlueOrbPosZ: 0,
  activeBlueOrbRotZ: 0,
  setActiveBlueOrbPosX: (to) => set(() => ({ activeBlueOrbPosX: to })),
  setActiveBlueOrbPosZ: (to) => set(() => ({ activeBlueOrbPosZ: to })),
  setActiveBlueOrbRotZ: (to) => set(() => ({ activeBlueOrbRotZ: to })),
  setActiveBlueOrbId: (to) => set(() => ({ blueOrbId: to })),
  setActiveBlueOrbHudId: (to) => set(() => ({ hudId: to })),
  toggleHud: () => set((state) => ({ hudActive: Number(!state.hudActive) })),
  setYellowHudText: (to) => set(() => ({ yellowHudText: to })),
  setIsActiveBlueOrbInteractedWith: (to) =>
    set(() => ({ isActiveBlueOrbInteractedWith: to })),
  incrementYellowHudTextPosY: (by) =>
    set((state) => ({ yellowHudTextPosY: state.yellowHudTextPosY + by })),
  setYellowHudTextPosY: (to) => set(() => ({ yellowHudTextPosY: to })),
  setYellowHudTextPosX: (to) => set(() => ({ yellowHudTextPosX: to })),
  setYellowHudTextOffsetXCoeff: (to) =>
    set(() => ({ yellowHudTextOffsetXCoeff: to })),
}));

export const useLainStore = create<LainState>((set) => ({
  lainMoveState: "standing",
  setLainMoveState: (to) => set(() => ({ lainMoveState: to })),
}));

// -2.5 - intro val
//-9.5 - intro val
//1.5 - intro val
export const useMainGroupStore = create<MainGroupState>((set) => ({
  mainGroupPosY: 0,
  mainGroupPosZ: 0,
  mainGroupRotX: 0,
  setMainGroupPosY: (to) => set(() => ({ mainGroupPosY: to })),
  setMainGroupPosZ: (to) => set(() => ({ mainGroupPosZ: to })),
  setMainGroupRotX: (to) => set(() => ({ mainGroupRotX: to })),
}));

export const useGrayPlanesStore = create<GrayPlanesState>((set) => ({
  grayPlanesVisible: true,
  setGrayPlanesVisible: (to) => set(() => ({ grayPlanesVisible: to })),
}));

export const useStarfieldStore = create<StarfieldState>((set) => ({
  introStarfieldVisible: false,
  mainStarfieldVisible: true,
  mainStarfieldBoostVal: 0.2,
  setIntroStarfieldVisible: (to) => set(() => ({ introStarfieldVisible: to })),
  setMainStarfieldVisible: (to) => set(() => ({ mainStarfieldVisible: to })),
  setMainStarfieldBoostVal: (to) => set(() => ({ mainStarfieldBoostVal: to })),
}));

export const useYellowOrbStore = create<YellowOrbState>((set) => ({
  yellowOrbVisible: false,
  setYellowOrbVisible: (to) => set(() => ({ yellowOrbVisible: to })),
}));

export const useSiteStore = create<SiteState>((set) => ({
  sitePosY: 0,
  siteRotY: 0,
  isSiteChangingY: false,
  incrementSitePosY: (by) =>
    set((state) => ({ sitePosY: state.sitePosY + by })),
  incrementSiteRotY: (by) =>
    set((state) => ({ siteRotY: state.siteRotY + by })),
  setSitePosY: (to) => set(() => ({ sitePosY: to })),
  setSiteRotY: (to) => set(() => ({ siteRotY: to })),
  setIsSiteChanging: (to) => set(() => ({ isSiteChangingY: to })),
}));

export const useMiddleRingStore = create<MiddleRingState>((set) => ({
  middleRingWobbleStrength: 0,
  middleRingRotating: true,
  middleRingNoise: 0.03,
  middleRingPosY: -0.11,
  middleRingRotX: 0,
  middleRingRotZ: 0,
  middleRingAnimDuration: 600,
  setMiddleRingWobbleStrength: (to) =>
    set(() => ({ middleRingWobbleStrength: to })),
  setMiddleRingRotating: (to) => set(() => ({ middleRingRotating: to })),
  setMiddleRingNoise: (to) => set(() => ({ middleRingNoise: to })),
  addToMiddleRingPosY: (by) =>
    set((state) => ({ middleRingPosY: state.middleRingPosY + by })),
  setMiddleRingPosY: (to) => set(() => ({ middleRingPosY: to })),
  setMiddleRingRotX: (to) => set(() => ({ middleRingRotX: to })),
  setMiddleRingRotZ: (to) => set(() => ({ middleRingRotZ: to })),
  setMiddleRingAnimDuration: (to) =>
    set(() => ({ middleRingAnimDuration: to })),
}));

export const useLevelStore = create<LevelState>((set) => ({
  activeLevels: ["03", "04", "05"],
  setActiveLevels: (to) => set(() => ({ activeLevels: to })),
}));

export const useMediaStore = create<MediaState>((set) => ({
  // we can't have one global activeElement because both right and left col
  // elements need to be stored (when you switch back and forth between the columns,
  // you end up on the last active element FROM THAT COLUMN).
  activeMediaElement: "play",
  activeLeftColElementIdx: 0,
  activeLeftColElement: { text: "Play", position: [-2.7, -0.9, 0.6] },
  leftColElements: [
    { text: "Play", position: [-2.7, -0.9, 0.6] },
    { text: "Exit", position: [-3.5, -1.6, 0.6] },
  ],
  toggleLeftColActiveElement: () =>
    set((state) => ({
      activeLeftColElement:
        state.leftColElements[Number(!state.activeLeftColElementIdx)],
    })),
}));
