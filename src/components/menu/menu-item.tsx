import { useRef, type ComponentProps, type KeyboardEvent } from "react";
import Primitive from "../../core/primitive";
import { useMenuContext } from "./menu-context";
import { useSubscribeToCollection } from "../../hooks/use-subscribe-to-collection";
import { composeEventHandlers } from "../../util/compose-event-handlers";

interface MenuItemProps extends ComponentProps<"li"> {
  asChild?: boolean;
}

export const MenuItem = ({
  children,
  onClick,
  onKeyDown,
  ...props
}: MenuItemProps) => {
  const { send } = useMenuContext();
  const itemRef = useRef<HTMLLIElement>(null);

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
    <Primitive.li
      role="menuitem"
      tabIndex={-1}
      onClick={composeEventHandlers(onClick, handleOnClick)}
      onKeyDown={composeEventHandlers(onKeyDown, handleOnKeyDown)}
      ref={itemRef}
      {...props}
    >
      {children}
    </Primitive.li>
  );
};
