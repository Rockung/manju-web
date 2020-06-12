import marked from 'marked';

import { link_sidebar } from './utils';
import { HASH_MENU } from '../store';

/**
 * Generate menu from the text of markdown
 *
 * The menu is a list in markdown, such as
 *
 * - [Home](./examples/home.md)
 * - [Products](./examples/product.md)
 * - [About](./examples/about.md)
 * - Contact
 *
 * @param {string} markdown the text
 * @return {string} the html for the markdown
 */
export function gen_menu(markdown) {
  const renderer = new marked.Renderer();

  renderer.link = (href, title, text) => {
    if (href === null) {
      return text;
    }
    let out = '<a href="#' + HASH_MENU + href + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  };

  return marked(markdown, { renderer });
}

/**
 * Generate sidebar from the text of markdown
 *
 * The sidebar is a two-level list in markdown, such as
 *
 * - Get Started
 *   - [Installation](install.md)
 *   - Creating your site
 *   - Publishing your site
 * - Guides
 *   - Adding a Blog
 *   - Custom Pages
 *
 * @param {string} markdown the text
 * @param {string} baseDir the base directory for links
 * @return {string} the html for the markdown
 */
export function gen_sidebar(markdown, baseDir) {
  const renderer = new marked.Renderer();

  renderer.listitem = (text) => {
    return '<li class="item">' + text + '</li>\n';
  };

  renderer.link = link_sidebar(baseDir);

  return marked(markdown, { renderer });
}
