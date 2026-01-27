import * as React from "react";
import Slot from "../../components/slot";

type PrimitiveElement<E extends React.ElementType> = React.ElementRef<E>;

type PrimitiveProps<E extends React.ElementType> =
  React.ComponentPropsWithoutRef<E> & {
    asChild?: boolean;
  };

type PrimitiveComponent<E extends React.ElementType> =
  React.ForwardRefExoticComponent<
    PrimitiveProps<E> & React.RefAttributes<PrimitiveElement<E>>
  >;

function createPrimitive<E extends React.ElementType>(
  element: E,
): PrimitiveComponent<E> {
  const Primitive = React.forwardRef<PrimitiveElement<E>, PrimitiveProps<E>>(
    ({ asChild, ...props }, ref) => {
      const Comp: any = asChild ? Slot : element;

      return <Comp ref={ref} {...props} />;
    },
  );

  Primitive.displayName = `Primitive.${String(element)}`;

  return Primitive as PrimitiveComponent<E>;
}

export const Primitive = {
  button: createPrimitive("button"),
  div: createPrimitive("div"),
  span: createPrimitive("span"),
  a: createPrimitive("a"),
  img: createPrimitive("img"),
  input: createPrimitive("input"),
  ul: createPrimitive("ul"),
  li: createPrimitive("li"),
};
