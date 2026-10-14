export interface Store<T> {
  get: () => T
  set: (next: T | ((current: T) => T)) => void
  subscribe: (listener: (value: T) => void) => () => void
}

export const createStore = <T>(initialValue: T): Store<T> => {
  let value = initialValue
  const listeners = new Set<(value: T) => void>()

  return {
    get: () => value,
    set: (next) => {
      value = typeof next === 'function' ? (next as (current: T) => T)(value) : next
      listeners.forEach((listener) => listener(value))
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}
