import marked from 'marked'
import Prism from 'prismjs'
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
        return code
      }

      const grammar = Prism.languages[lang]
      if (!grammar) {
        console.warn(`Unable to find grammar for "${lang}".`)
        return code
      }

      let highlighted = Prism.highlight(code, grammar, lang)
      return `<pre class='language-${lang}'><code>${highlighted}</code></pre>`
    }
  })

  return {
    html,
    anchors,
  }
}

export function get_sidebar(markdown) {
  let tokens = marked.lexer(markdown, {})

  let sidebar = []
  let tokenMap = {}

  let currH2 = null
  let preH3 = null
  let startIndex = 0

  for (let i = 0; i < tokens.length; i++) {
    let t = tokens[i]
    if (t.type !== 'heading') {
      continue
    }

    if (t.depth === 2) { // h2
      currH2 = { title: t.text, children: [], }
      sidebar.push(currH2)
    } else if (t.depth === 3) { // h3
      // end the previous h3 
      if (preH3) {
        tokenMap[slug(currH2.title + " " + preH3.text)] = tokens.slice(startIndex, i - 1)
        preH3 = null
      }

      // start a new h3
      if (currH2) {
        preH3 = {
          text: t.text,
          href: '/#/sidebar/' + slug(currH2.title + " " + t.text)
        }
        currH2.children.push(preH3)
        startIndex = i
      }
    }
  }

  if (preH3) {
    tokenMap[slug(currH2.title + " " + preH3.text)] = tokens.slice(startIndex, tokens.length - 1)
  }

  return {
    sidebar,
    tokenMap,
  }
}

/**
 * Generate html from the given tokens
 * 
 * @param {*} tokens which comes from `marked.lexer`
 * @return a html string 
 */
export function gen_html_from_tokens(tokens) {
  return marked.parser(tokens, {
    highlight(code, lang) {
      if (!lang) {
        return code
      }

      const grammar = Prism.languages[lang]
      if (!grammar) {
        console.warn(`Unable to find grammar for "${lang}".`)
        return code
      }

      let highlighted = Prism.highlight(code, grammar, lang)
      return `<pre class='language-${lang}'><code>${highlighted}</code></pre>`
    }
  })
}

