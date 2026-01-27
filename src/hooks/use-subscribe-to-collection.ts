import { useEffect, type RefObject } from "react";
import { useCollection } from "./use-collection";

export function useSubscribeToCollection(
  itemRef: RefObject<HTMLElement | null>,
) {
  const { registerItem, unregisterItem } = useCollection();

  useEffect(() => {
    registerItem(itemRef);

    return () => {
      unregisterItem(itemRef);
    };
  }, [itemRef, registerItem, unregisterItem]);
}
