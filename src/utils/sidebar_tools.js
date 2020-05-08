import marked from 'marked'
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
  return marked(markdown)
}
