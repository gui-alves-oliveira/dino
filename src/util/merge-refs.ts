export function mergeRefs<T>(...refs: Array<React.Ref<T>>) {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else {
        if (ref && "current" in ref) {
          ref.current = value;
        }
      }
    });
  };
}
