import {
  useCallback,
  useEffect,
  type ComponentProps,
  type KeyboardEvent,
} from "react";
import Primitive from "../../core/primitive";
import { useMenuContext } from "./menu-context";
import { useRovingFocus } from "../../hooks/use-roving-focus";
import { composeEventHandlers } from "../../util/compose-event-handlers";
import {
  CLOSE_KEYS,
  MOVE_DOWN_KEYS,
  MOVE_UP_KEYS,
} from "../../contants/keyboard-navigation";
import { useFloatingPosition } from "../../hooks/use-floating-position";

export const MenuPopover = ({
  children,
  onKeyDown,
  ...props
}: ComponentProps<"div">) => {
  const { isOpen, state, close, triggerRef, popoverRef } = useMenuContext();
  const { focusNext, focusPrevious, focusFirst } = useRovingFocus();

  useEffect(() => {
    if (state === "open") {
      focusFirst();
    }
  }, [focusFirst, state]);

  const { x, y } = useFloatingPosition({
    anchorRef: triggerRef,
    floatRef: popoverRef,
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (true) {
        case CLOSE_KEYS.includes(e.key):
          e.preventDefault();
          close("escape");
          break;

        case MOVE_DOWN_KEYS.includes(e.key):
          e.preventDefault();
          focusNext();
          break;

        case MOVE_UP_KEYS.includes(e.key):
          e.preventDefault();
          focusPrevious();
          break;
      }
    },
    [close, focusNext, focusPrevious],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Primitive.div
      role="menu"
      onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
      style={{ x, y }}
      ref={popoverRef}
      {...props}
    >
      {children}
    </Primitive.div>
  );
};
