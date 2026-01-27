import { useContext } from "react";
import { MenuContext } from "../context/menu";

export function useMenuContext() {
  const ctx = useContext(MenuContext);

  if (!ctx) {
    throw new Error("Menu components must be insede <Menu>");
  }

  return ctx;
}
