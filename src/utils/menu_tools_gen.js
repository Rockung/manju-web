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

// the positions in the regex
const MENU = 1
const CONTENTS = 2
// use () to capture the matches
const REG_EX = /(# menu\n)|(# contents\n)/i

export function split_menu_file(src) {
  let capture
  let curr = 0
  let sections = {}

  while ((capture = REG_EX.exec(src)) !== null) {
    if (curr > 0) {
      sections[curr] = src.substring(0, capture.index)
    } 

    if (capture[MENU]) {
      curr = MENU
    }
    else if (capture[CONTENTS]) {
      curr = CONTENTS
    } else {
      curr = 0
    }

    src = src.substring(capture.index + capture[0].length)
  }

  // the last section
  if (curr > 0 && src) {
    sections[curr] = src
  }

  return sections
}

export { MENU, CONTENTS }