import marked from 'marked';

import { HASH_MENU, HASH_SIDEBAR } from '../store';

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
 * @param {*} markdown
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
 * @param {*} markdown
 */
export function gen_sidebar(markdown, baseDir) {
  const renderer = new marked.Renderer();

  renderer.listitem = (text) => {
    return '<li class="item">' + text + '</li>\n';
  };

  renderer.link = (href, title, text) => {
    if (href === null) {
      return text;
    }

    let out;
    if (href.endsWith('.ppt.md')) { // handle ppt for manju-show
      out = '<a href="manju-show.html?' + baseDir + href + '" target="_blank"';
    } else {
      out = '<a href="#' + HASH_SIDEBAR + baseDir + href + '"';
    }
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';
    return out;
  };

  return marked(markdown, { renderer });
}
