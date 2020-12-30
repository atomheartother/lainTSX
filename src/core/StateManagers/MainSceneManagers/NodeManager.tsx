import { useCallback, useEffect } from "react";
import { useNodeStore } from "../../../store";
import { StateManagerProps } from "../EventManager";

const NodeManager = (props: StateManagerProps) => {
  const setActiveNodeState = useNodeStore((state) => state.setActiveNodeState);
  const setNodeMatrixIndices = useNodeStore(
    (state) => state.setNodeMatrixIndices
  );

  const animateActiveNodeThrow = useCallback(
    (siteRotY: number) => {
      setActiveNodeState(true, "interactedWith");

      const calculateCoordsBasedOnRotation = (
        x: number,
        z: number,
        rotation: number
      ) => ({
        x: x * Math.cos(rotation) - z * Math.sin(rotation),
        z: x * Math.sin(rotation) + z * Math.cos(rotation),
      });

      const fstCoordSet = calculateCoordsBasedOnRotation(0.9, 0.3, siteRotY);
      const sndCoordSet = calculateCoordsBasedOnRotation(0.5, 0.2, siteRotY);
      const thirdCoordSet = calculateCoordsBasedOnRotation(1.55, 0.2, siteRotY);
      const fourthCoordSet = calculateCoordsBasedOnRotation(0, 2, siteRotY);

      setActiveNodeState(fstCoordSet.x, "posX");
      setActiveNodeState(fstCoordSet.z, "posZ");

      setTimeout(() => {
        setActiveNodeState(sndCoordSet.x, "posX");
        setActiveNodeState(sndCoordSet.z, "posZ");
      }, 800);
      setTimeout(() => {
        setActiveNodeState(thirdCoordSet.x, "posX");
        setActiveNodeState(-0.005, "rotZ");
      }, 2600);
      setTimeout(() => {
        setActiveNodeState(fourthCoordSet.x, "posX");
        setActiveNodeState(fourthCoordSet.z, "posZ");
        setActiveNodeState(-0.5, "rotZ");
      }, 2700);

      setTimeout(() => {
        setActiveNodeState(0, "rotZ");
        setActiveNodeState(false, "interactedWith");
      }, 3800);
    },
    [setActiveNodeState]
  );

  const updateActiveNode = useCallback(
    (
      newActiveNodeId: string,
      newNodeMatrixIndices: {
        matrixIdx: number;
        rowIdx: number;
        colIdx: number;
      },
      isMoving?: boolean,
      delay?: number
    ) => {
      setTimeout(() => {
        setActiveNodeState(newActiveNodeId, "id");
        setNodeMatrixIndices(newNodeMatrixIndices);
      }, delay);
    },
    [setActiveNodeState, setNodeMatrixIndices]
  );

  const dispatchObject = useCallback(
    (eventState: {
      event: string;
      activeNodeId: string;
      nodeMatrixIndices: {
        matrixIdx: number;
        rowIdx: number;
        colIdx: number;
      };
      siteRotY: number;
    }) => {
      switch (eventState.event) {
        case "site_up":
        case "site_down":
        case "site_left":
        case "site_right":
        case "select_level_up":
        case "select_level_down":
          return {
            action: updateActiveNode,
            value: [
              eventState.activeNodeId,
              eventState.nodeMatrixIndices,
              true,
              3900,
            ],
          };
        case "change_node":
          return {
            action: updateActiveNode,
            value: [eventState.activeNodeId, eventState.nodeMatrixIndices],
          };
        case "throw_node_media":
        case "throw_node_gate":
        case "throw_node_sskn":
        case "throw_node_tak":
          return {
            action: animateActiveNodeThrow,
            value: [eventState.siteRotY],
          };
      }
    },
    [animateActiveNodeThrow, updateActiveNode]
  );

  useEffect(() => {
    if (props.eventState) {
      const dispatchedObject = dispatchObject(props.eventState);

      if (dispatchedObject) {
        (dispatchedObject.action as any).apply(
          null,
          dispatchedObject.value as never
        );
      }
    }
  }, [props.eventState, setActiveNodeState, dispatchObject]);
  return null;
};

export default NodeManager;