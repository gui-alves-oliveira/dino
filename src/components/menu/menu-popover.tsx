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
}: ComponentProps<"ul">) => {
  const { isOpen, state, send } = useMenuContext();
  const { focusNext, focusPrevious, focusFirst } = useRovingFocus();

  useEffect(() => {
    if (state === "open") {
      focusFirst();
    }
  }, [focusFirst, state]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          send({ type: "ESCAPE" });
          break;

        case "ArrowDown":
          e.preventDefault();
          focusNext();
          break;

        case "ArrowUp":
          e.preventDefault();
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
    <Primitive.ul
      role="menu"
      onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
      {...props}
    >
      {children}
    </Primitive.ul>
  );
};
