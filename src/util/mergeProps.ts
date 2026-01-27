import { composeEventHandlers } from "./composeEventHandlers";

export function mergeProps<T extends Record<string, any>>(
  theirProps: T,
  ourProps: T,
): T {
  const result = { ...theirProps, ...ourProps };

  for (const key in theirProps) {
    if (
      key.startsWith("on") &&
      typeof theirProps[key] === "function" &&
      typeof ourProps[key] === "function"
    ) {
      result[key] = composeEventHandlers(theirProps[key], ourProps[key]);
    }
  }

  return result;
}
