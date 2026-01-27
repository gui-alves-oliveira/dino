import {
  createContext,
  useContext,
  type Dispatch,
  type RefObject,
} from "react";
import type { MenuEvent, MenuState } from "./menu-state";

type MenuContextProps = {
  state: MenuState;
  isOpen: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  popoverRef: RefObject<HTMLUListElement | null>;
  open: () => void;
  close: () => void;
  send: Dispatch<MenuEvent>;
};

export const MenuContext = createContext<MenuContextProps | null>(null);

export function useMenuContext() {
  const ctx = useContext(MenuContext);

  if (!ctx) {
    throw new Error("Menu components must be insede <Menu>");
  }

  return ctx;
}
