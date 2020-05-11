import marked from 'marked'
import Prism from 'prismjs'
import { slug } from './sluger';

export async function get_markdown(file) {
  const res = await fetch(file);
  const markdown = await res.text()

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
    tokenMap[slug(currH2.title + " " + preH3.text)] = tokens.slice(startIndex, tokens.length-1)
  }

  return {
    sidebar,
    tokenMap,
  }
}

export function gen_html(tokens) {
  console.log(tokens.length)
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
