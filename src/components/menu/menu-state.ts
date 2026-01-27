export type MenuState = "closed" | "opening" | "open" | "closing";

export type MenuCloseReason =
  | "escape"
  | "item-click"
  | "outside"
  | "blur"
  | "programmatic"
  | "toggle";

export type MenuEvent =
  | { type: "OPEN" }
  | { type: "CLOSE"; reason: MenuCloseReason }
  | { type: "TOGGLE" };

export function menuReducer(state: MenuState, event: MenuEvent): MenuState {
  switch (state) {
    case "closed":
      if (event.type === "OPEN" || event.type === "TOGGLE") {
        return "open";
      }

      return state;

    case "opening":
      return "open";

    case "open":
      if (event.type === "CLOSE" || event.type === "TOGGLE") {
        return "closed";
      }

      return state;

    case "closing":
      return state;
  }
}
