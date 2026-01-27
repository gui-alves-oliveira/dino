import { createContext, useContext, type RefObject } from "react";
import type { MenuCloseReason, MenuOpenReason, MenuState } from "./menu-state";

type MenuContextProps = {
  state: MenuState;
  isOpen: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  popoverRef: RefObject<HTMLDivElement | null>;
  open: (props: { reason: MenuOpenReason }) => void;
  close: (props: { reason: MenuCloseReason }) => void;
};

export const MenuContext = createContext<MenuContextProps | null>(null);

export function useMenuContext() {
  const ctx = useContext(MenuContext);

  if (!ctx) {
    throw new Error("Menu components must be insede <Menu>");
  }

  return ctx;
}
