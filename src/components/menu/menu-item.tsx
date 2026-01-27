import { useRef, type ComponentProps, type KeyboardEvent } from "react";
import Primitive from "../../core/primitive";
import { useSubscribeToCollection } from "../../hooks/useSubscribeToCollection";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useMenuContext } from "./hooks/useMenuContext";

interface MenuItemProps extends ComponentProps<"button"> {
  asChild?: boolean;
}

export const MenuItem = ({
  children,
  onClick,
  onKeyDown,
  asChild,
  ...props
}: MenuItemProps) => {
  const { send } = useMenuContext();
  const itemRef = useRef<HTMLButtonElement>(null);

  useSubscribeToCollection(itemRef);

  const handleOnClick = () => {
    send({ type: "CLOSE" });
  };

  const handleOnKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        send({ type: "CLOSE" });
    }
  };

  return (
    <Primitive.button
      ref={itemRef}
      asChild={asChild}
      onClick={composeEventHandlers(onClick, handleOnClick)}
      onKeyDown={composeEventHandlers(onKeyDown, handleOnKeyDown)}
      {...props}
    >
      {children}
    </Primitive.button>
  );
};
