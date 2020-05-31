import { writable } from 'svelte/store'

export const pageStore = writable(
  {
    website:"",
    baseUrl: "",
    baseDir: "",
    menu: [],
    sidebar: [],
    contents: "",
    anchors: []
  }
)
