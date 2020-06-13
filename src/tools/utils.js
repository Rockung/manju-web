import { HASH_SIDEBAR } from '../store';
export function link_sidebar(baseDir) {
  return function (href, title, text) {
    if (href === null) {
      return text;
    }

    let out;
    if (href.endsWith('.ppt.md')) { // handle ppt for manju-show
      out = `<a href="manju-show.html?${baseDir}${href}" target="_blank"`;
    } else if (href.indexOf('://') > 0) { // external links
      out = `<a href="${href}" target="_blank"`;
    } else {
      out = `<a href="#${HASH_SIDEBAR}${baseDir}${href}"`;
    }

    if (title) {
      out += ' title="' + title + '"';
    }
    out += '>' + text + '</a>';

    return out;
  };
}
