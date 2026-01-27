import { createContext, type RefObject } from "react";

export type CollectionContextValue = {
  registerItem: (ref: RefObject<HTMLElement | null>) => void;
  unregisterItem: (ref: RefObject<HTMLElement | null>) => void;
  getItems: () => HTMLElement[];
};

export const CollectionContext = createContext<CollectionContextValue | null>(
  null,
);
