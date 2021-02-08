import { useStore } from "../../../store";

const bootManager = (eventState: any) => {
  const setMainMenuComponentMatrixIdx = useStore.getState()
    .setMainMenuComponentMatrixIdx;

  const setAuthorizeUserLetterIdx = useStore.getState()
    .setAuthorizeUserLetterIdx;

  const dispatchAction = (eventState: {
    event: string;
    authorizeUserLetterIdx: number;
  }) => {
    switch (eventState.event) {
      case "main_menu_up":
        return {
          action: () => setMainMenuComponentMatrixIdx(0),
        };
      case "main_menu_down":
        return {
          action: () => setMainMenuComponentMatrixIdx(1),
        };
      case "main_menu_authorize_user_select":
        return { action: () => setAuthorizeUserLetterIdx(0) };
      case "authorize_user_up":
      case "authorize_user_down":
      case "authorize_user_left":
      case "authorize_user_right":
        return {
          action: () =>
            setAuthorizeUserLetterIdx(eventState.authorizeUserLetterIdx),
        };
    }
  };

  const { action } = { ...dispatchAction(eventState) };

  if (action) {
    action();
  }
};

export default bootManager;