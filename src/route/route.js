import { get } from 'svelte/store';

import { HASH_MENU, HASH_SIDEBAR, pageStore } from '../store'
import { handleIndexPage, handleMenuPage, handleSidebarPage } from "./page";

export async function handleMount() {
  let href = window.location.href;
  let pos = href.lastIndexOf("/");
  let baseUrl = href.substring(0, pos + 1);

  let result = await handleIndexPage(baseUrl + "index.md");
  // FIXME: baseDir should be fixed if the docs is not placed in the root
  pageStore.update((page) => ({ ...page, ...result, baseDir: "/", baseUrl }))
}

export async function handleHashChange() {
  const currPage = get(pageStore);

  const hashPath = window.location.hash.slice(1);
  let baseDir, basePath, result;

  if (hashPath.startsWith(HASH_MENU)) {
    basePath = hashPath.substring(HASH_MENU.length);
    result = await handleMenuPage(currPage.baseUrl + basePath);
  } else if (hashPath.startsWith(HASH_SIDEBAR)) {
    basePath = hashPath.substring(HASH_SIDEBAR.length);
    result = await handleSidebarPage(currPage.baseUrl + basePath);
  }

  if (result) {
    baseDir = basePath.substring(0, basePath.lastIndexOf("/") + 1);
    pageStore.update((page) => ({ ...page, ...result, baseDir }))
  }
}
