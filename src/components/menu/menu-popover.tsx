import {
  useCallback,
  useEffect,
  type ComponentProps,
  type KeyboardEvent,
} from "react";
import Primitive from "../../core/primitive";
import { useFloating } from "@floating-ui/react-dom";
import { offset } from "@floating-ui/react-dom";
import { flip } from "@floating-ui/react-dom";
import { shift } from "@floating-ui/react-dom";
import { useMenuContext } from "./menu-context";
import { useRovingFocus } from "../../hooks/use-roving-focus";
import { composeEventHandlers } from "../../util/compose-event-handlers";
import {
  CLOSE_KEYS,
  MOVE_DOWN_KEYS,
  MOVE_UP_KEYS,
} from "../../contants/keyboard-navigation";

export const MenuPopover = ({
  children,
  onKeyDown,
  ...props
}: ComponentProps<"ul">) => {
  const { isOpen, state, close, triggerRef, popoverRef } = useMenuContext();
  const { focusNext, focusPrevious, focusFirst } = useRovingFocus();

  useEffect(() => {
    if (state === "open") {
      focusFirst();
    }
  }, [focusFirst, state]);

  const { floatingStyles, refs } = useFloating({
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift({ padding: 0 })],
  });

  useEffect(() => {
    if (popoverRef.current) {
      refs.setFloating(popoverRef.current);
    }

    if (triggerRef.current) {
      refs.setReference(triggerRef.current);
    }
  }, [popoverRef, refs, triggerRef]);

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
    return;
  }

  return (
    <Primitive.ul
      role="menu"
      onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
      style={{ ...floatingStyles }}
      ref={popoverRef}
      {...props}
    >
      {children}
    </Primitive.ul>
  );
};
