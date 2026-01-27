import { useCallback, type ComponentProps, type KeyboardEvent } from "react";
import Primitive from "../../core/primitive";
import { useRovingFocus } from "../../hooks/useRovingFocus";
import { composeEventHandlers } from "../../util/composeEventHandlers";

export const MenuPopover = ({
  children,
  onKeyDown,
  ...props
}: ComponentProps<"div">) => {
  const { focusNext, focusPrevious } = useRovingFocus();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          focusNext();
          break;

        case "ArrowUp":
          focusPrevious();
          break;
      }
    },
    [focusNext, focusPrevious],
  );

  return (
    <Primitive.div
      onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
      {...props}
    >
      {children}
    </Primitive.div>
  );
};
