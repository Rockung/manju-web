import marked from 'marked';
import Prism from 'prismjs';
import { slugize } from '../utils/slugize';

/**
 * Generate html with scroll-spy
 *
 * @param {*} markdown the text of markdown
 * @return { html, anchors }
 *     html: the html attached to the main area
 *     anchors: the anchors for scroll-spy
 */
export function gen_html_with_spy(markdown) {
  const anchors = [];
  const renderer = new marked.Renderer();

  renderer.heading = (text, level, rawtext) => {
    let slug;

    const match = /<a href="([^"]+)">(.+)<\/a>/.exec(text);
    if (match) {
      slug = slugize(match[1]);
      text = match[2];
    } else {
      slug = slugize(rawtext);
    }

    if (level === 3 || level === 4) {
      const title = text
        .replace(/<\/?code>/g, '')
        .replace(/\.(\w+)(\((.+)?\))?/, (m, $1, $2, $3) => {
          if ($3) return `.${$1}(...)`;
          if ($2) return `.${$1}()`;
          return `.${$1}`;
        });

      anchors.push({ slug, title, level });
    }

    return `
      <h${level} id="${slug}">
        <span>${text}</span>
      </h${level}>`;
  };

  let html = marked(markdown, {
    renderer,
    highlight(code, lang) {
      if (!lang) {
        return code;
      }

      const grammar = Prism.languages[lang];
      if (!grammar) {
        console.warn(`Unable to find grammar for "${lang}".`);
        return code;
      }

      let highlighted = Prism.highlight(code, grammar, lang);
      return `<pre class='language-${lang}'><code>${highlighted}</code></pre>`;
    }
  });

  return {
    html,
    anchors,
  };
}
