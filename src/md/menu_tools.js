import marked from 'marked'

/**
 * Get menus from the text of markdown
 * 
 * @param {*} markdown 
 */
export function get_menus(markdown) {
  let result = []

  let tokens = marked.lexer(markdown, {})
  for (let t of tokens) {
    if (t.type === 'heading' && t.depth === 2) {
      if (t.tokens.length === 1) {
        result.push({
          text: t.tokens[0].text,
          href: t.tokens[0].href ? t.tokens[0].href : ''
        })
      }
    }
  }

  return result
}

/**
 * Get sidebar from the text of markdown
 * 
 * @param {*} markdown 
 */
export function get_sidebar(markdown) {
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
