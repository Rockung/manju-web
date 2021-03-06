import { get_file } from '../utils/network';
import { gen_html_with_spy } from '../tools/md_tools';
import { gen_menu, gen_sidebar } from '../tools/menu_tools';
import { MENU, CONTENTS, split_index_file } from '../tools/text_tools';

/**
 * Handle the index page
 *   get and parse `index.md` into page elements
 */
export async function handleIndexPage(url, baseDir) {
  let menu = '';
  let sidebar = '';
  let contents = '';
  let anchors = [];

  let markdown = await get_file(url);
  let splits = split_index_file(markdown);

  if (splits[MENU]) {
    menu = gen_menu(splits[MENU]);
  }

  if (splits[CONTENTS]) {
    let html_spy = gen_html_with_spy(splits[CONTENTS], baseDir);

    contents = html_spy.html;
    anchors = html_spy.anchors;
  }

  return {
    menu,
    sidebar,
    contents,
    anchors,
  };
}

/**
 * Handle a menu page
 *   get and parse a menu file into page elements
 */
export async function handleMenuPage(url, baseDir) {
  let sidebar = '';
  let contents = '';
  let anchors = [];

  let markdown = await get_file(url);
  let splits = split_index_file(markdown);

  if (splits[MENU]) {
    sidebar = gen_sidebar(splits[MENU], baseDir);
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
  };
}

/**
 * Handle a sidebar page
 *   get and parse a sidebar file into page elements
 */
export async function handleSidebarPage(url, baseDir) {
  let markdown = await get_file(url);
  let { html: contents, anchors } = gen_html_with_spy(markdown, baseDir);

  return {
    contents,
    anchors,
  };
}
