import { useEffect, type ComponentProps, type KeyboardEvent } from "react";
import Primitive from "../../core/primitive";
import { useMenuContext } from "./menu-context";
import { composeEventHandlers } from "../../util/compose-event-handlers";
import { CLOSE_KEYS, OPEN_KEYS } from "../../contants/keyboard-navigation";
import { mergeRefs } from "../../util/merge-refs";

interface MenuTriggerProps extends ComponentProps<"button"> {
  asChild?: boolean;
}

export const MenuTrigger = ({
  children,
  onClick,
  onKeyDown,
  ...props
}: MenuTriggerProps) => {
  const { state, isOpen, open, close, triggerRef, floating } = useMenuContext();

  const toggle = () => {
    if (isOpen) {
      close({ reason: "programmatic" });
    } else {
      open({ reason: "programmatic" });
    }
  };

  const handleClick = () => {
    toggle();
  };

  useEffect(() => {
    if (state === "closed") {
      triggerRef.current?.focus();
    }
  }, [state, triggerRef]);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (true) {
      case OPEN_KEYS.includes(e.key):
        e.preventDefault();
        toggle();
        break;

      case CLOSE_KEYS.includes(e.key):
        e.preventDefault();
        close({ reason: "escape" });
        break;
    }
  };

  return (
    <Primitive.button
      onClick={composeEventHandlers(onClick, handleClick)}
      onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
      ref={mergeRefs(triggerRef, floating.refs.setReference)}
      {...props}
    >
      {children}
    </Primitive.button>
  );
};
