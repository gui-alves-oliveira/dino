import { useRef, type ComponentProps, type KeyboardEvent } from "react";
import Primitive from "../../core/primitive";
import { useMenuContext } from "./menu-context";
import { useSubscribeToCollection } from "../../hooks/use-subscribe-to-collection";
import { composeEventHandlers } from "../../util/compose-event-handlers";
import { SELECT_KEYS } from "../../contants/keyboard-navigation";

interface MenuItemProps extends ComponentProps<"div"> {
  asChild?: boolean;
}

export const MenuItem = ({
  children,
  onClick,
  onKeyDown,
  ...props
}: MenuItemProps) => {
  const { close } = useMenuContext();
  const itemRef = useRef<HTMLDivElement>(null);

  useSubscribeToCollection(itemRef);

  const handleOnClick = () => {
    close({ reason: "item-click" });
  };

  const handleOnKeyDown = (e: KeyboardEvent) => {
    switch (true) {
      case SELECT_KEYS.includes(e.key):
        e.preventDefault();
        close({ reason: "item-click" });
    }
  };

  return (
    <Primitive.div
      role="menuitem"
      tabIndex={-1}
      onClick={composeEventHandlers(onClick, handleOnClick)}
      onKeyDown={composeEventHandlers(onKeyDown, handleOnKeyDown)}
      ref={itemRef}
      {...props}
    >
      {children}
    </Primitive.div>
  );
};
