import { writable } from 'svelte/store'

export const pageStore = writable(
  {
    baseUrl: "",
    baseDir: "",
    menu: [],
    sidebar: [],
    contents: "",
    anchors: []
  }
)
