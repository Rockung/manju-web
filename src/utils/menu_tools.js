import marked from 'marked'

export function gen_menus(markdown) {
  const renderer = new marked.Renderer()

  renderer.heading = (text, level, rawtext) => {
    if (level === 2) {
      return `
        <li>${text}</li>`
    }

    return ''
  };

  const html = marked(
    markdown.replace(/^\t+/gm, match => match.split('\t').join('  ')),
    { renderer }
  );

  return {
    html,
  }
}

export async function get_menus() {
  const res = await fetch(`menu.md`);
  const markdown = await res.text()

  let result = []
  
  let tokens = marked.lexer(markdown, {})
  console.log(tokens)
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
