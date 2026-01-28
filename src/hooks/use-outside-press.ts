import { useEffect } from "react";

type UseOutsidePressOptions = {
  enabled?: boolean;
  callback: () => void;
};

export function useOutsidePress(
  refs: Array<React.RefObject<HTMLElement | null>>,
  { enabled = true, callback }: UseOutsidePressOptions,
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;

      const isInside = refs.some(
        (ref) => ref.current && ref.current.contains(target),
      );

      if (!isInside) {
        callback();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [refs, enabled, callback]);
}
