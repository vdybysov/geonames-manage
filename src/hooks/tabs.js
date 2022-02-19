import { getContext, setContext } from "svelte";
import { writable } from "svelte/store";

export const setTabs = (initial) => {

    const tab = writable(initial)

    setContext('tabs', {
        current: tab,
        set: newTab => tab.set(newTab)
    })
}

export const useTabs = () => getContext('tabs')