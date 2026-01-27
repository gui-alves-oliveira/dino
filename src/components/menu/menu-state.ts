export type MenuState = "closed" | "opening" | "open" | "closing";

export type MenuEvent =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" }
  | { type: "ESCAPE" }
  | { type: "CLICK_OUT" };

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
      if (
        event.type === "CLOSE" ||
        event.type === "ESCAPE" ||
        event.type === "CLICK_OUT" ||
        event.type === "TOGGLE"
      ) {
        return "closed";
      }

      return state;

    case "closing":
      return state;
  }
}
