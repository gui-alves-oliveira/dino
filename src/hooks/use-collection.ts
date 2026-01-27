import { useContext } from "react";
import CollectionContext from "../core/collection";

export function useCollection() {
  const ctx = useContext(CollectionContext);
  if (!ctx) {
    throw new Error("Must be used within CollectionProvider");
  }

  return ctx;
}
