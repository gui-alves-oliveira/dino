import { useCallback } from "react";
import { useCollection } from "./use-collection";

export function useRovingFocus() {
  const { getItems } = useCollection();

  const getCurrentIndex = (items: HTMLElement[]) => {
    const active = document.activeElement;
    return items.findIndex((el) => el === active);
  };

  const focusAt = useCallback(
    (index: number) => {
      const items = getItems();
      if (!items.length) return;

      const clampedIndex =
        ((index % items.length) + items.length) % items.length;

      items[clampedIndex]?.focus();
    },
    [getItems],
  );

  const focusNext = useCallback(() => {
    const items = getItems();
    if (!items.length) return;

    const currentIndex = getCurrentIndex(items);
    focusAt(currentIndex + 1);
  }, [getItems, focusAt]);

  const focusPrevious = useCallback(() => {
    const items = getItems();
    if (!items.length) return;

    const currentIndex = getCurrentIndex(items);
    focusAt(currentIndex - 1);
  }, [getItems, focusAt]);

  const focusFirst = useCallback(() => {
    const items = getItems();
    if (!items.length) return;

    items[0]?.focus();
  }, [getItems]);

  const focusLast = useCallback(() => {
    const items = getItems();
    if (!items.length) return;

    items[items.length - 1]?.focus();
  }, [getItems]);

  return {
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    focusAt,
  };
}
