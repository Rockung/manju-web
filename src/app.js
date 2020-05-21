import { get_file } from './utils/network'
import { gen_html_with_spy } from './md/md_tools'
import {
  get_menus,
  get_sidebar,
} from './md/menu_tools'
import {
  MENU, CONTENTS,
  split_index_file
} from './md/text_tools'

/**
 * Handle the index page
 *   get and parse `index.md` into page elements
 */
export async function handleIndexPage(url) {
  let menus = [];
  let sidebar = [];
  let contents = "";
  let anchors = [];

  let markdown = await get_file(url);
  let splits = split_index_file(markdown);

  if (splits[MENU]) {
    menus = get_menus(splits[MENU]);
  }

  if (splits[CONTENTS]) {
    let html_spy = gen_html_with_spy(splits[CONTENTS]);

    contents = html_spy.html;
    anchors = html_spy.anchors;
  }

  return {
    menus,
    sidebar,
    contents,
    anchors,
  }
}

/**
 * Handle a menu page
 *   get and parse a menu file into page elements
 */
export async function handleMenuPage(url) {
  console.log(url)
  
  let sidebar = [];
  let contents = "";
  let anchors = [];

  let markdown = await get_file(url);
  let splits = split_index_file(markdown);

  if (splits[MENU]) {
    sidebar = get_sidebar(splits[MENU]);
  }

  if (splits[CONTENTS]) {
    let html_spy = gen_html_with_spy(splits[CONTENTS]);

    contents = html_spy.html;
    anchors = html_spy.anchors;
  }

  return {
    sidebar,
    contents,
    anchors,
  }
}

/**
 * Handle a sidebar page
 *   get and parse a sidebar file into page elements
 */
export async function handleSidebarPage(url) {
  let markdown = await get_file(url);
  let { html: contents, anchors } = gen_html_with_spy(markdown);

  return {
    contents,
    anchors,
  }
}
