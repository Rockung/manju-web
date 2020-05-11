import marked from 'marked'
import Prism from 'prismjs'

export async function get_sidebar() {
  const res = await fetch(`sidebar.md`);
  const markdown = await res.text()

  let result = []
  let tokens = marked.lexer(markdown, {})

  let curr = null
  for (let t of tokens) {
    if (t.type !== 'heading') {
      continue
    }

    if (t.depth === 2) { //h2
      curr = {
        title: t.text,
        children: [],
      }
      result.push(curr)
    } else if (t.depth === 3) { // h3
      if (curr) {
        if (t.tokens.length === 1) {
          curr.children.push({
            text: t.tokens[0].text,
            href: t.tokens[0].href ? t.tokens[0].href : ''
          })
        }
      }
    }
  }

  return result
}

export async function gen_html(path) {
  const res = await fetch(path);
  const markdown = await res.text()

  // const renderer = new marked.Renderer();

  // renderer.heading = (text, level, rawtext) => {
  //   console.log(text)
  //   console.log(rawtext)
  //   return `
  //     <h${level}>
  //       ${text}
  //     </h${level}>`;
  // };

  // return marked(markdown, {
  //   // renderer,
  //   highlight(code, lang) {
  //     if(!lang) {
  //       return code
  //     }

  //     const grammar = Prism.languages[lang]
  //     if (!grammar) {
  //       console.warn(`Unable to find grammar for "${lang}".`)
  //       return code
  //     }

  //     let highlighted = Prism.highlight(code, grammar, lang)
  //     return `<pre class='language-${lang}'><code>${highlighted}</code></pre>`
  //   }
  // })
  
  let tokens = marked.lexer(markdown, {})
  return marked.parser(tokens, {
    // renderer,
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
