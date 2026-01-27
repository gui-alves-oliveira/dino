import { useReducer, useRef, type ReactNode } from "react";
import { menuReducer } from "./menu-state";
import { MenuContext } from "./context/menu";
import { MenuPopover } from "./menu-popover";
import { MenuItem } from "./menu-item";
import { MenuTrigger } from "./menu-trigger";
import { CollectionProvider } from "../../core/collection/collection";

interface MenuRootProps {
  children: ReactNode;
}

const MenuRoot = ({ children }: MenuRootProps) => {
  const [state, send] = useReducer(menuReducer, "closed");

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isOpen = state === "open" || state === "opening";

  return (
    <MenuContext.Provider
      value={{
        state,
        isOpen,
        triggerRef,
        contentRef,
        open: () => send({ type: "OPEN" }),
        close: () => send({ type: "CLOSE" }),
        send,
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
