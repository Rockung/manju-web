import marked from 'marked'

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

export function gen_menus(markdown) {
  const renderer = new marked.Renderer()

  // list(body, ordered, start) {
  //   const type = ordered ? 'ol' : 'ul',
  //     startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
  //   return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
  // }

  // listitem(text) {
  //   return '<li>' + text + '</li>\n';
  // }

  renderer.list = (body, ordered, start) => {
    const type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : ''

    return '<' + type + startatt + ' class=\"manjusri-menu\">\n' + body + '</' + type + '>\n';
  }

  const html = marked(
    markdown.replace(/^\t+/gm, match => match.split('\t').join('  ')),
    { renderer }
  )

  return {
    html,
  }
}
