import { flip } from "@floating-ui/react-dom";
import { shift } from "@floating-ui/react-dom";
import { offset } from "@floating-ui/react-dom";
import { useFloating } from "@floating-ui/react-dom";
import { useEffect, type RefObject } from "react";

export function useFloatingPosition({
  anchorRef,
  floatRef,
}: {
  anchorRef: RefObject<HTMLElement | null>;
  floatRef: RefObject<HTMLElement | null>;
}) {
  const { x, y, refs } = useFloating({
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift({ padding: 0 })],
  });

  useEffect(() => {
    if (anchorRef.current) {
      refs.setFloating(anchorRef.current);
    }

    if (floatRef.current) {
      refs.setReference(floatRef.current);
    }
  }, [anchorRef, floatRef, refs]);

  return {
    x,
    y,
  };
}
