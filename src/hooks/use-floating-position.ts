import { offset, shift, flip, autoUpdate } from "@floating-ui/react-dom";
import { useFloating } from "@floating-ui/react-dom";
import { useEffect, type RefObject } from "react";

interface FloatingPositionProps {
  anchorRef: RefObject<HTMLElement | null>;
  floatRef: RefObject<HTMLElement | null>;
}

export function useFloatingPosition({
  anchorRef,
  floatRef,
}: FloatingPositionProps) {
  const { floatingStyles, refs } = useFloating({
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [offset(), flip(), shift()],
  });

  useEffect(() => {
    if (anchorRef.current) {
      refs.setReference(anchorRef.current);
    }

    if (floatRef.current) {
      refs.setFloating(floatRef.current);
    }
  }, [anchorRef, floatRef, refs]);

  return {
    floatingStyles,
  };
}
