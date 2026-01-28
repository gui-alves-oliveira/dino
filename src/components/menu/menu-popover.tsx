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
import { mergeRefs } from "../../util/merge-refs";
import { useOutsidePress } from "../../hooks/use-outside-press";

export const MenuPopover = ({
  children,
  onKeyDown,
  ...props
}: ComponentProps<"div">) => {
  const { isOpen, state, close, triggerRef, popoverRef, floating } =
    useMenuContext();
  const { focusNext, focusPrevious, focusFirst } = useRovingFocus();

  useEffect(() => {
    if (state === "open") {
      focusFirst();
    }
  }, [focusFirst, state]);

  useOutsidePress([triggerRef, popoverRef], {
    enabled: isOpen,
    callback: () => {
      close({ reason: "outside" });
    },
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (true) {
        case CLOSE_KEYS.includes(e.key):
          e.preventDefault();
          close({ reason: "escape" });
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
      style={{ ...floating.floatingStyles }}
      ref={mergeRefs(popoverRef, floating.refs.setFloating)}
      {...props}
    >
      {children}
    </Primitive.div>
  );
};
