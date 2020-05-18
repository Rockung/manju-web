import marked from 'marked'

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
