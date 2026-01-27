import { useRef, type ComponentProps } from "react";
import Primitive from "../../core/primitive";
import { useSubscribeToCollection } from "../../hooks/useSubscribeToCollection";

export const MenuItem = ({ children, ...props }: ComponentProps<"button">) => {
  const itemRef = useRef<HTMLButtonElement>(null);

  useSubscribeToCollection(itemRef);

  return (
    <Primitive.button ref={itemRef} {...props}>
      {children}
    </Primitive.button>
  );
};
