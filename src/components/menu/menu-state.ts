export type MenuState = "closed" | "opening" | "open" | "closing";

export type MenuEvent =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" }
  | { type: "ESCAPE" }
  | { type: "BLUR" };

export function menuReducer(state: MenuState, event: MenuEvent): MenuState {
  switch (state) {
    case "closed":
      if (event.type === "OPEN") {
        return "opening";
      }

      return state;

    case "opening":
      if (event.type === "CLOSE") {
        return "closing";
      }

      if (event.type === "OPEN") {
        return "open";
      }

      return state;

    case "open":
      if (
        event.type === "CLOSE" ||
        event.type === "ESCAPE" ||
        event.type === "BLUR"
      ) {
        return "closing";
      }

      return state;

    case "closing":
      if (event.type === "OPEN") {
        return "opening";
      }

      if (event.type === "CLOSE") {
        return "closed";
      }

      return state;
  }
}
