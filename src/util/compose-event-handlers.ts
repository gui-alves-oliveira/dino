export function composeEventHandlers<E>(
  theirHandler?: (event: E) => void,
  ourHandler?: (event: E) => void,
) {
  return (event: E) => {
    theirHandler?.(event);

    if (!event.defaultPrevented) {
      ourHandler?.(event);
    }
  };
}
