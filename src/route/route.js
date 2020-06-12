/* eslint-disable no-undef */

import { get } from 'svelte/store';

import { get_json } from '../utils/network';
import { HASH_MENU, HASH_SIDEBAR, pageStore } from '../store';
import { handleIndexPage, handleMenuPage, handleSidebarPage } from './page';

export async function handleMount() {
  let hash = window.location.hash;
  let href = window.location.href;

  let baseUrl = href.substring(0, href.length - hash.length);

  let config = await get_json('manju-web-config.json');
  let website = config['website'] || 'DEFAULT';

  // FIXME: baseDir should be fixed if the docs is not placed in the root
  let result = await handleIndexPage(baseUrl + 'index.md', '/');
  pageStore.update((page) => ({ ...page, ...result, baseDir: '/', website, baseUrl }));

  if (hash.length > 0) {
    handleHashChange();
  }
}

export async function handleHashChange() {
  const currPage = get(pageStore);
  const hashPath = window.location.hash.slice(1);

  let baseDir, basePath, result;

  if (hashPath.startsWith(HASH_MENU)) {
    basePath = hashPath.substring(HASH_MENU.length);
    baseDir = basePath.substring(0, basePath.lastIndexOf('/') + 1);
    result = await handleMenuPage(currPage.baseUrl + basePath, baseDir);
  } else if (hashPath.startsWith(HASH_SIDEBAR)) {
    basePath = hashPath.substring(HASH_SIDEBAR.length);
    baseDir = basePath.substring(0, basePath.lastIndexOf('/') + 1);
    result = await handleSidebarPage(currPage.baseUrl + basePath, baseDir);
  }

  if (result) {
    pageStore.update((page) => ({ ...page, ...result, baseDir }));
  }
}
