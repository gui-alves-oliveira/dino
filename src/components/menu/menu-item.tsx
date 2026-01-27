import { useRef, type ComponentProps, type KeyboardEvent } from "react";
import Primitive from "../../core/primitive";
import { useMenuContext } from "./menu-context";
import { useSubscribeToCollection } from "../../hooks/use-subscribe-to-collection";
import { composeEventHandlers } from "../../util/compose-event-handlers";
import { SELECT_KEYS } from "../../contants/keyboard-navigation";

interface MenuItemProps extends ComponentProps<"li"> {
  asChild?: boolean;
}

export const MenuItem = ({
  children,
  onClick,
  onKeyDown,
  ...props
}: MenuItemProps) => {
  const { close } = useMenuContext();
  const itemRef = useRef<HTMLLIElement>(null);

  useSubscribeToCollection(itemRef);

  const handleOnClick = () => {
    close("item-click");
  };

  const handleOnKeyDown = (e: KeyboardEvent) => {
    switch (true) {
      case SELECT_KEYS.includes(e.key):
        e.preventDefault();
        close("item-click");
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
