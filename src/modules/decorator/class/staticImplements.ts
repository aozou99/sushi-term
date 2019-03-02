export function staticImplements<T>() {
  return (constructor: T) => {};
}
