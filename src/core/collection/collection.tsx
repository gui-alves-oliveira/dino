import { useCallback, useRef, type ReactNode, type RefObject } from "react";
import { CollectionContext } from "./collection-context";

export function CollectionProvider({ children }: { children: ReactNode }) {
  const items = useRef<Set<RefObject<HTMLElement | null>>>(new Set());

  const registerItem = useCallback((ref: RefObject<HTMLElement | null>) => {
    items.current.add(ref);
  }, []);

  const unregisterItem = useCallback((ref: RefObject<HTMLElement | null>) => {
    items.current.delete(ref);
  }, []);

  const getItems = useCallback(() => {
    return Array.from(items.current)
      .map((ref) => ref.current)
      .filter((el): el is HTMLElement => el !== null)
      .sort((a, b) =>
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      );
  }, []);

  return (
    <CollectionContext.Provider
      value={{ registerItem, unregisterItem, getItems }}
    >
      {children}
    </CollectionContext.Provider>
  );
}
