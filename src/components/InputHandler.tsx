import React, { useCallback, useEffect, useState } from "react";
import {
  LainMoveDown,
  LainMoveLeft,
  LainMoveRight,
  LainMoveUp,
  LainStanding,
} from "./Lain/Lain";
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentHUDAtom, hudActiveAtom } from "./HUD/HUDElementAtom";
import { currentBlueOrbAtom } from "./BlueOrb/CurrentBlueOrbAtom";
import lain_animations from "../resources/lain_animations.json";
import blue_orb_huds from "../resources/blue_orb_huds.json";
import blue_orb_directions from "../resources/blue_orb_directions.json";
import {
  lainMoveStateAtom,
  lainMovingAtom,
  lainPosYAtom,
} from "./Lain/LainAtom";
import { camPosYAtom, camRotYAtom } from "./MainScene/CameraAtom";
import {
  starfieldPosYAtom,
  starfieldRotYAtom,
} from "./Starfield/StarfieldAtom";
import { BlueOrbHuds } from "./HUD/HUDElement";
import {
  orthoCamPosYAtom,
  orthoCamRotYAtom,
} from "./OrthoCamera/OrthoCameraAtom";
import {
  grayPlanesPosYAtom,
  grayPlanesRotYAtom,
} from "./GrayPlanes/GrayPlanesAtom";
import {
  middleRingNoiseAtom,
  middleRingPosYAtom,
  middleRingRotatingAtom,
  middleRingRotXAtom,
  middleRingRotYAtom,
  middleRingRotZAtom,
  middleRingWobbleStrengthAtom,
} from "./MiddleRing/MiddleRingAtom";
import { lightPosYAtom, lightRotYAtom } from "./Lights/LightsAtom";

type KeyCodeAssociations = {
  [keyCode: number]: string;
};

type SpriteDirectionData = {
  [direction: string]: string;
};

type SpriteDirections = {
  [sprite_id: string]: SpriteDirectionData;
};

type LainAnimationData = {
  frame_count: number;
  duration: number;
};
type LainAnimations = {
  [sprite: string]: LainAnimationData;
};

const InputHandler = () => {
  const [currentBlueOrb, setCurrentBlueOrb] = useRecoilState(
    currentBlueOrbAtom
  );

  const [lainMoving, setLainMoving] = useRecoilState(lainMovingAtom);
  const setLainMoveState = useSetRecoilState(lainMoveStateAtom);

  const [spriteUpdateCooldown, setSpriteUpdateCooldown] = useState(false);

  const setCurrentHUDElement = useSetRecoilState(currentHUDAtom);

  const setHudActive = useSetRecoilState(hudActiveAtom);

  const setCamPosY = useSetRecoilState(camPosYAtom);
  const setCamRotY = useSetRecoilState(camRotYAtom);

  const setOrthoCamPosY = useSetRecoilState(orthoCamPosYAtom);
  const setOrthoCamRotY = useSetRecoilState(orthoCamRotYAtom);

  const setLainPosY = useSetRecoilState(lainPosYAtom);

  const setGrayPlanePosY = useSetRecoilState(grayPlanesPosYAtom);
  const setGrayPlaneRotY = useSetRecoilState(grayPlanesRotYAtom);

  const setStarfieldPosY = useSetRecoilState(starfieldPosYAtom);
  const setStarfieldRotY = useSetRecoilState(starfieldRotYAtom);

  const setMiddleRingWobbleStrength = useSetRecoilState(
    middleRingWobbleStrengthAtom
  );
  const setMiddleRingRotating = useSetRecoilState(middleRingRotatingAtom);
  const setMiddleRingNoise = useSetRecoilState(middleRingNoiseAtom);
  const setMiddleRingPosY = useSetRecoilState(middleRingPosYAtom);
  const setMiddleRingRotX = useSetRecoilState(middleRingRotXAtom);
  const setMiddleRingRotZ = useSetRecoilState(middleRingRotZAtom);
  const setMiddleRingRotY = useSetRecoilState(middleRingRotYAtom);

  const setLightPosY = useSetRecoilState(lightPosYAtom);
  const setLightRotY = useSetRecoilState(lightRotYAtom);

  const moveCamera = useCallback(
    (val: number) => {
      setCamPosY((prev: number) => prev + val);
      setLainPosY((prev: number) => prev - val);
      setStarfieldPosY((prev: number) => prev - val);
      setOrthoCamPosY((prev: number) => prev - val);
      setGrayPlanePosY((prev: number) => prev - val);
      setLightPosY((prev: number) => prev - val);

      setTimeout(() => {
        setMiddleRingPosY((prev: number) => prev - (val - 0.2));
      }, 1300);

      setTimeout(() => {
        setMiddleRingPosY((prev: number) => prev - 0.2);
      }, 1800);
    },
    [
      setCamPosY,
      setLainPosY,
      setStarfieldPosY,
      setOrthoCamPosY,
      setGrayPlanePosY,
      setMiddleRingPosY,
      setLightPosY,
    ]
  );

  const rotateCamera = useCallback(
    (val: number) => {
      setCamRotY((prev: number) => prev + val);
      setStarfieldRotY((prev: number) => prev - val);
      setOrthoCamRotY((prev: number) => prev - val);
      setGrayPlaneRotY((prev: number) => prev - val);
      setLightRotY((prev: number) => prev - val);

      setTimeout(() => {
        setMiddleRingRotY((prev: number) => prev - 0.55);
      }, 1800);
    },
    [
      setCamRotY,
      setStarfieldRotY,
      setOrthoCamRotY,
      setGrayPlaneRotY,
      setLightRotY,
      setMiddleRingRotY,
    ]
  );

  const getMove = (currentLoc: string, key: string): string => {
    return (blue_orb_directions as SpriteDirections)[currentLoc][key];
  };

  const getKeyCodeAssociation = (keyCode: number): string => {
    return ({
      40: "down",
      37: "left",
      38: "up",
      39: "right",
    } as KeyCodeAssociations)[keyCode];
  };

  const setAnimationState = useCallback(
    (key: string) => {
      switch (key) {
        case "down":
          setLainMoveState(<LainMoveDown />);

          setTimeout(() => {
            moveCamera(1.5);
          }, 1300);

          // make noise appear again
          setTimeout(() => {
            setMiddleRingNoise(0.06);
          }, 800);

          // disable rotation of the ring
          setTimeout(() => {
            setMiddleRingRotating(false);
          }, 700);

          // set ring rotation on x axis to craete motion effect
          setTimeout(() => {
            setMiddleRingRotX(0.3);
          }, 1500);

          // rotate it again, set ring noise to 0
          setTimeout(() => {
            setMiddleRingRotX(-0.1);
            setMiddleRingNoise(0);
          }, 3500);

          // rotate it back AGAIN (holy fuk psx game)
          setTimeout(() => {
            setMiddleRingRotX(0.05);
          }, 4500);

          // reset value, set noise to 0
          setTimeout(() => {
            setMiddleRingRotX(0);
            setMiddleRingRotating(true);
          }, 4800);

          // enable noise again in about 11-12 secs
          setTimeout(() => {
            setMiddleRingNoise(0.03);
          }, 11600);

          break;
        case "left":
          setTimeout(() => {
            rotateCamera(0.55);
          }, 1100);

          setTimeout(() => {
            setMiddleRingRotZ(0.07);
          }, 2300);

          setTimeout(() => {
            setMiddleRingRotZ(-0.03);
          }, 3500);

          setTimeout(() => {
            setMiddleRingRotZ(0);
          }, 4500);

          setLainMoveState(<LainMoveLeft />);
          break;
        case "up":
          setLainMoveState(<LainMoveUp />);

          setTimeout(() => {
            moveCamera(-1.5);
          }, 1300);

          // change noise to 0, make the ring bend downwards
          setTimeout(() => {
            setMiddleRingNoise(0);
            setMiddleRingWobbleStrength(0.2);
          }, 300);

          // disable rotation of the ring
          setTimeout(() => {
            setMiddleRingRotating(false);
          }, 700);

          // make the ring bend upwards
          setTimeout(() => {
            setMiddleRingWobbleStrength(-0.3);
          }, 1300);

          // reset the ring bend, set the rotation to slightly curve
          // to replicate a motion effect (since its moving upwards)
          // and enable rotation again
          setTimeout(() => {
            setMiddleRingWobbleStrength(0.0);
            setMiddleRingRotX(-0.2);
            setMiddleRingRotating(true);
          }, 1500);

          // reset the rotation value to 0
          setTimeout(() => {
            setMiddleRingRotX(0);
          }, 2500);

          // enable noise again in about 8~ secs
          setTimeout(() => {
            setMiddleRingNoise(0.03);
          }, 7800);

          break;
        case "right":
          setTimeout(() => {
            rotateCamera(-0.55);
          }, 1100);

          setTimeout(() => {
            setMiddleRingRotZ(-0.07);
          }, 2300);

          setTimeout(() => {
            setMiddleRingRotZ(0.03);
          }, 3500);

          setTimeout(() => {
            setMiddleRingRotZ(0);
          }, 4500);

          setLainMoveState(<LainMoveRight />);
          break;

        default:
          break;
      }

      // set moving to true to avoid player from overlapping animations and stuff
      // by waiting for the anim to finish
      setLainMoving(true);

      // wait for the anim to finish, set lain to standing state, release the move lock
      setTimeout(() => {
        setLainMoveState(<LainStanding />);
        setTimeout(() => {
          setLainMoving(false);
        }, 300);
      }, (lain_animations as LainAnimations)[key]["duration"]);
    },
    [
      moveCamera,
      rotateCamera,
      setLainMoveState,
      setLainMoving,
      setMiddleRingNoise,
      setMiddleRingRotX,
      setMiddleRingRotating,
      setMiddleRingWobbleStrength,
    ]
  );

  const updateHUD = useCallback(() => {
    setHudActive((prev: number) => Number(!prev));
  }, [setHudActive]);

  const moveDispatcher = useCallback(
    (move: string, key: string) => {
      switch (move[0]) {
        // do nothing / cant move
        case undefined:
          break;
        // "+" in the json denotes that the sprite chosen by getMove is not currently on screen,
        // therefore lain should first do a move (up/down/left/right) and then that sprite
        // will be chosen.
        case "+":
          if (!spriteUpdateCooldown) {
            // hide the hud
            updateHUD();
            // disable glow on current sprite
            setCurrentBlueOrb("");
            setSpriteUpdateCooldown(true);
            setAnimationState(key);
            setTimeout(() => {
              updateHUD();
              // skip the "+"
              setCurrentBlueOrb(move.substr(1));
              setCurrentHUDElement(
                (blue_orb_huds as BlueOrbHuds)[move.substr(3)]
              );
            }, (lain_animations as LainAnimations)[key]["duration"] + 200);
            setTimeout(() => {
              setSpriteUpdateCooldown(false);
            }, 1000);
          }
          break;
        // only change sprite focus
        default:
          if (!spriteUpdateCooldown) {
            setCurrentBlueOrb(move);
            setSpriteUpdateCooldown(true);
            // toggle hud to go back in
            updateHUD();
            setTimeout(() => {
              // change hud while its hidden
              setCurrentHUDElement(
                (blue_orb_huds as BlueOrbHuds)[move.substr(2)]
              );
              // toggle it again to be shown in the new position
              updateHUD();
            }, 500);
            setTimeout(() => {
              setSpriteUpdateCooldown(false);
            }, 1000);
          }
      }
    },
    [
      setAnimationState,
      updateHUD,
      spriteUpdateCooldown,
      setCurrentHUDElement,
      setCurrentBlueOrb,
    ]
  );

  const handleKeyPress = useCallback(
    (event) => {
      const { keyCode } = event;

      const key = getKeyCodeAssociation(keyCode);

      if (key && !lainMoving) {
        const move = getMove(currentBlueOrb, key);

        moveDispatcher(move, key);
      }
    },
    [lainMoving, currentBlueOrb, moveDispatcher]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return <></>;
};

export default InputHandler;