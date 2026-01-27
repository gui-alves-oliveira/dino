import { useEffect, type ComponentProps, type KeyboardEvent } from "react";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import Primitive from "../../core/primitive";
import { useMenuContext } from "./hooks/useMenuContext";
import { useRovingFocus } from "../../hooks/useRovingFocus";

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
    switch (e.key) {
      case "ArrowDown":
      case "Enter":
      case " ":
        e.preventDefault();
        send({ type: "TOGGLE" });
        break;

      case "Escape":
        e.preventDefault();
        send({ type: "CLOSE" });
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
