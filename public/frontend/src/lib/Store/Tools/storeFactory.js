import { writable } from 'svelte/store'
import { onDestroy } from 'svelte'

export function subToDestroyFactory(store) {
  let variable, unsubscribe = store.subscribe(value => variable = value);

  onDestroy(unsubscribe);

  return variable;
}

export function writableFactory(name, init) {
  const store = writable(init);

  return {
    [`${name}Store`]: store,
    [`${name}Sub`]: () => subToDestroyFactory(store)
  }
}