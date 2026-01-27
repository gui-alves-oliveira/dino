import { createContext, type Dispatch, type RefObject } from "react";
import type { MenuEvent, MenuState } from "../menu-state";

type MenuContextProps = {
  state: MenuState;
  isOpen: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  open: () => void;
  close: () => void;
  send: Dispatch<MenuEvent>;
};

export const MenuContext = createContext<MenuContextProps | null>(null);
