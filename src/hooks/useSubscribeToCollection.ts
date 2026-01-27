import { useEffect, type RefObject } from "react";
import { useCollection } from "./useCollection";

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
