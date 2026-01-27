import {
  useCallback,
  useEffect,
  type ComponentProps,
  type KeyboardEvent,
} from "react";
import Primitive from "../../core/primitive";
import { useRovingFocus } from "../../hooks/useRovingFocus";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useMenuContext } from "./hooks/useMenuContext";

export const MenuPopover = ({
  children,
  onKeyDown,
  ...props
}: ComponentProps<"div">) => {
  const { isOpen, state, send } = useMenuContext();
  const { focusNext, focusPrevious, focusFirst } = useRovingFocus();

  useEffect(() => {
    if (state === "open") {
      focusFirst();
    }
  }, [focusFirst, state]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          send({ type: "ESCAPE" });
          break;

        case "ArrowDown":
          focusNext();
          break;

        case "ArrowUp":
          focusPrevious();
          break;
      }
    },
    [focusNext, focusPrevious, send],
  );

  if (!isOpen) {
    return;
  }

  return (
    <Primitive.div
      onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
      {...props}
    >
      {children}
    </Primitive.div>
  );
};
