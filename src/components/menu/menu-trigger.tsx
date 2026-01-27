import type { ComponentProps } from "react";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import Primitive from "../../core/primitive";

interface MenuTriggerProps extends ComponentProps<"button"> {
  asChild?: boolean;
}

export const MenuTrigger = ({
  children,
  onClick,
  ...props
}: MenuTriggerProps) => {
  const handleClick = () => {
    console.log("this is my internal click");
  };

  return (
    <Primitive.button
      onClick={composeEventHandlers(onClick, handleClick)}
      {...props}
    >
      {children}
    </Primitive.button>
  );
};
