import { useReducer, useRef, type ReactNode } from "react";
import {
  menuReducer,
  type MenuCloseReason,
  type MenuOpenReason,
} from "./menu-state";
import { MenuPopover } from "./menu-popover";
import { MenuItem } from "./menu-item";
import { MenuTrigger } from "./menu-trigger";
import { CollectionProvider } from "../../core/collection/collection";
import { MenuContext } from "./menu-context";

interface MenuRootProps {
  children: ReactNode;
}

const MenuRoot = ({ children }: MenuRootProps) => {
  const [state, send] = useReducer(menuReducer, "closed");

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLUListElement>(null);

  const isOpen = state === "open" || state === "opening";

  return (
    <MenuContext.Provider
      value={{
        state,
        isOpen,
        triggerRef,
        popoverRef,
        open: (reason: MenuOpenReason) => send({ type: "OPEN", reason }),
        close: (reason: MenuCloseReason) => send({ type: "CLOSE", reason }),
      }}
    >
      <CollectionProvider>{children}</CollectionProvider>
    </MenuContext.Provider>
  );
};

export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Popover: MenuPopover,
  Item: MenuItem,
});
