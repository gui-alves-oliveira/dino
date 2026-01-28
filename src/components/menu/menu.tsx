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
import {
  offset,
  flip,
  shift,
  useFloating,
  autoUpdate,
} from "@floating-ui/react-dom";

interface MenuRootProps {
  children: ReactNode;
}

const MenuRoot = ({ children }: MenuRootProps) => {
  const [state, send] = useReducer(menuReducer, "closed");

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const floating = useFloating({
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift()],
  });

  const isOpen = state === "open" || state === "opening";

  const open = ({ reason }: { reason: MenuOpenReason }) => {
    send({ type: "OPEN", reason });
  };

  const close = ({ reason }: { reason: MenuCloseReason }) => {
    send({ type: "CLOSE", reason });
  };

  return (
    <MenuContext.Provider
      value={{
        state,
        isOpen,
        triggerRef,
        popoverRef,
        open,
        close,
        floating,
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
