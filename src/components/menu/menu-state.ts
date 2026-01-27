export type MenuState = "closed" | "opening" | "open" | "closing";

export type MenuCloseReason =
  | "escape"
  | "item-click"
  | "outside"
  | "blur"
  | "programmatic";

export type MenuOpenReason =
  | "trigger-click"
  | "trigger-keyboard"
  | "programmatic";

export type MenuEvent =
  | { type: "OPEN"; reason: MenuOpenReason }
  | { type: "CLOSE"; reason: MenuCloseReason };

export function menuReducer(state: MenuState, event: MenuEvent): MenuState {
  switch (state) {
    case "closed":
      if (event.type === "OPEN") {
        return "open";
      }

      return state;

    case "opening":
      return "open";

    case "open":
      if (event.type === "CLOSE") {
        return "closed";
      }

      return state;

    case "closing":
      return state;
  }
}
