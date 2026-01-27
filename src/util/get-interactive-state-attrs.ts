export function getInteractiveStateAttrs(state: {
  disabled?: boolean;
  selected?: boolean;
}) {
  return {
    "data-disabled": state.disabled ? "" : undefined,
    "data-selected": state.selected ? "" : undefined,
    "aria-disabled": state.disabled || undefined,
    "aria-selected": state.selected || undefined,
  };
}
