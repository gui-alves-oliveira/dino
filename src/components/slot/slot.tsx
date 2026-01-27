import * as React from "react";
import { mergeProps } from "../../util/mergeProps";

export const Slot = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(function Slot({ children, ...props }, forwardedRef) {
  if (!React.isValidElement(children)) {
    return null;
  }

  const child = children as React.ReactElement<any>;

  return React.cloneElement(child, {
    ...mergeProps(child.props, props),
    ref: forwardedRef,
  });
});
