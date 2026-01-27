import { useEffect, type ComponentProps, type KeyboardEvent } from "react";
import Primitive from "../../core/primitive";
import { useMenuContext } from "./menu-context";
import { composeEventHandlers } from "../../util/compose-event-handlers";
import { CLOSE_KEYS, OPEN_KEYS } from "../../contants/keyboard-navigation";

interface MenuTriggerProps extends ComponentProps<"button"> {
  asChild?: boolean;
}

export const MenuTrigger = ({
  children,
  onClick,
  onKeyDown,
  ...props
}: MenuTriggerProps) => {
  const { state, send, triggerRef } = useMenuContext();

  const handleClick = () => {
    send({ type: "TOGGLE" });
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
        send({ type: "TOGGLE" });
        break;

      case CLOSE_KEYS.includes(e.key):
        e.preventDefault();
        send({ type: "CLOSE", reason: "escape" });
        break;
    }
  };

  return (
    <Primitive.button
      onClick={composeEventHandlers(onClick, handleClick)}
      onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
      ref={triggerRef}
      {...props}
    >
      {children}
    </Primitive.button>
  );
};
